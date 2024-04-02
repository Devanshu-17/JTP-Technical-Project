import os
from bson import ObjectId
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from multiprocessing import context
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import FunctionTransformer
from sklearn.pipeline import Pipeline
import numpy as np
import uvicorn
import re
import joblib

from fastapi.responses import RedirectResponse
from database import fetch_food_data_from_mongodb

# Add MongoDB connection details
mongodb_url = "mongodb://localhost:27017/"
mongodb_database = "food_database"
mongodb_collection = "food_collection"

# Load dataset
df = pd.read_csv('../data/dataset.csv')

# Preprocessing functions
def scaler_operation(dataframe):
    # Drop rows with missing values
    dataframe.dropna(inplace=True)
    scaler = StandardScaler()
    data_prep = scaler.fit_transform(dataframe.iloc[:, 4:10].to_numpy())
    return data_prep, scaler


# Perform Nearest Neighbours clustering
def nn_clustering(data_prep):
    nearest_neighbours = NearestNeighbors(metric='cosine', algorithm='brute') # Use cosine similarity as the metric 
    nearest_neighbours.fit(data_prep)
    return nearest_neighbours

# Build a pipeline which includes the scaler and nearest neighbours model
def build_pipeline(nearest_neighbours, scaler, var):
    transformer = FunctionTransformer(nearest_neighbours.kneighbors, kw_args=var)
    model_pipeline = Pipeline([('std_scaler', scaler), ('NN', transformer)])
    return model_pipeline

# Extract data based on user input
def extract_data(dataframe,ingredients):
    extracted_data=dataframe.copy()
    extracted_data['food_type'] = extracted_data['food_type'].apply(lambda x: 1 if x == 'Non-Veg' else 0)
    for column in extracted_data.columns[4:10]:
        extracted_data[column] = pd.to_numeric(extracted_data[column], errors='coerce')
    extracted_data=extract_ingredient_filtered_data(extracted_data,ingredients)
    return extracted_data

# Filter data based on ingredients
def extract_ingredient_filtered_data(dataframe,ingredients):
    extracted_data=dataframe.copy()
    regex_string=''.join(map(lambda x:f'(?=.*{x})',ingredients))
    extracted_data=extracted_data[extracted_data['ingredients'].str.contains(regex_string,regex=True,flags=re.IGNORECASE)]
    return extracted_data

# Apply the pipeline to the input data
def apply_pipeline(model_pipeline,_input,extracted_data):
    _input=np.array(_input).reshape(1,-1)
    return extracted_data.iloc[model_pipeline.transform(_input)[0]]

# Initialize FastAPI
app = FastAPI()

app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "../frontend")), name="static")
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "../frontend/templates"))


# Define a route to render the index.html template
@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# Define request body model
class UserInput(BaseModel):
    food_type: str
    allergies: list
    ingredients: list
    calories: int = None
    fat_content: int = None
    protein_content: int = None


# Define a route to recommend food items based on user input
@app.post("/recommend/")
async def recommend_food_item(user_input: UserInput):
    # Preprocess user input
    extracted_data = extract_data(df, user_input.ingredients)
    
    # Define var dictionary with default value for n_neighbors
    var = {'n_neighbors': 5, 'return_distance': False}
    
    # Check if the extracted data has enough items to recommend
    if extracted_data.shape[0] >= var['n_neighbors']:
        data_prep, scaler = scaler_operation(extracted_data)
        nearest_neighbours = nn_clustering(data_prep)
        model_pipeline = build_pipeline(nearest_neighbours, scaler, var)
        
        # Prepare user input
        input_data = pd.DataFrame({
            'food_type': [1 if user_input.food_type.lower() == 'non-veg' else 0],
            'glutenFree': 1 if 'glutenFree' in user_input.allergies else 0,
            'dairyFree': 1 if 'dairyFree' in user_input.allergies else 0,
            'Calories': [user_input.calories],
            'FatContent': [user_input.fat_content],
            'ProteinContent': [user_input.protein_content]
        })
        
        # Apply the pipeline to the input data
        apply_pipeline(model_pipeline, input_data, extracted_data)
        
        # Apply model_pipeline and get recommendations
        recommended_indices = model_pipeline.transform(input_data)[0]
        recommended_items = extracted_data.iloc[recommended_indices]

        # Prepare response in the expected format
        response_data = [{'id': idx, 'food': food} for idx, food in zip(recommended_items['id'], recommended_items['food'])]

        # Return the response
        return JSONResponse(content=response_data)
    else:
        raise HTTPException(status_code=404, detail="No items found with the given ingredients")

# Define a route to fetch food details based on food name
@app.get("/fetch-food-details/")
async def fetch_food_details(food: str):
    details = fetch_food_data_from_mongodb(food, mongodb_url, mongodb_database, mongodb_collection)
    
    # Convert ObjectId to string
    if '_id' in details:
        details['_id'] = str(details['_id'])
    
    return details


# Run the FastAPI application with Uvicorn
if __name__ == "__main__":
    extracted_data = extract_data(df, [])
    data_prep, scaler = scaler_operation(extracted_data)
    nearest_neighbours = nn_clustering(data_prep)
    var = {'return_distance': False}
    model_pipeline = build_pipeline(nearest_neighbours, scaler, var)
    
    uvicorn.run(app, host="0.0.0.0", port=8000)
