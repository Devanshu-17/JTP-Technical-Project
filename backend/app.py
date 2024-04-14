import os
from bson import ObjectId
from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sklearn.metrics.pairwise import cosine_similarity

from multiprocessing import context
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import FunctionTransformer
import numpy as np
import uvicorn
import re
import joblib

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
import pickle

from fastapi.responses import RedirectResponse
from database import save_dataset_to_mongodb, fetch_food_data_from_mongodb

# Add MongoDB connection details
mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017/")
mongodb_database = os.getenv("MONGODB_DATABASE", "food_database")
mongodb_collection = "food_collection"

# Load dataset
df = pd.read_csv('dataset.csv')

mongo_data = "dataset.csv"

# Save the dataset to MongoDB
save_dataset_to_mongodb(mongo_data, mongodb_url, mongodb_database, mongodb_collection)


# Preprocessing: Convert 'food' column to a single string per row
df['food'] = df['food'].apply(lambda x: ' '.join(str(x).split()))

import joblib

# # Load the vectorizer and kmeans models
# vectorizer = joblib.load('../vectorizer.pkl')
# kmeans = joblib.load('../kmeans.pkl')


# Vectorize the 'food' column
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df['food'])

# Clustering with KMeans
kmeans = KMeans(n_clusters=5, random_state=2).fit(X)

# The labels_ attribute contains the cluster assignments for each food item
df['food_cluster'] = kmeans.labels_

# Reduce dimensionality to 2D for visualization
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X.toarray())

# Function to preprocess input criteria
def preprocess_input(food_type, calories, fat_content, protein_content, gluten_free, dairy_free):
    gluten_free = 'True' if gluten_free else 'False'
    dairy_free = 'True' if dairy_free else 'False'
    input_string = f"{food_type} {calories} {fat_content} {protein_content} {gluten_free} {dairy_free}"
    print(f"Input string: {input_string}")  # Add this print statement
    return input_string

# Function to find cluster based on input criteria
def find_cluster(input_string, vectorizer, kmeans):
    input_vector = vectorizer.transform([input_string])
    cluster = kmeans.predict(input_vector)[0]
    print(f"Cluster found for input: {cluster}")  # Add this print statement
    return cluster


# Function to recommend food items from the same cluster
def recommend_food_by_cluster(df, cluster, num_recommendations=5):
    similar_food_items = df[df['food_cluster'] == cluster]
    print(f"Similar food items in cluster {cluster}: {similar_food_items}")  # Add this print statement
    recommendations = similar_food_items.sample(n=num_recommendations)
    return recommendations


def recommend_food(df, vectorizer, kmeans, food_type, calories, fat_content, protein_content, gluten_free, dairy_free, ingredients, num_recommendations=5):
    input_string = preprocess_input(food_type, calories, fat_content, protein_content, gluten_free, dairy_free)
    cluster = find_cluster(input_string, vectorizer, kmeans)
    similar_food_items = df[df['food_cluster'] == cluster]
    
    # Filter based on ingredients
    filtered_items = similar_food_items[similar_food_items['ingredients'].apply(lambda x: all(ingredient in x.lower() for ingredient in ingredients))]
    
    if len(filtered_items) < num_recommendations:
        print("Not enough items in the cluster matching the criteria.")
        return filtered_items
    else:
        recommendations = filtered_items.sample(n=num_recommendations, replace=False)  # Sampling without replacement
        return recommendations



# Initialize FastAPI
app = FastAPI()

# Define the origins that are allowed to make cross-origin requests
origins = [
    "http://localhost:3000", # React app
    "http://localhost:8000", # FastAPI app
    "mongodb://localhost:27017/", # MongoDB
    "http://localhost"
]

# Add CORS middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
    input_string = preprocess_input(user_input.food_type, user_input.calories, user_input.fat_content, user_input.protein_content, 'Gluten' in user_input.allergies, 'Dairy' in user_input.allergies)
    cluster = find_cluster(input_string, vectorizer, kmeans)
    
    # Pass the ingredients list to the recommend_food function
    recommendations = recommend_food(df, vectorizer, kmeans, user_input.food_type, user_input.calories, user_input.fat_content, user_input.protein_content, 'Gluten' in user_input.allergies, 'Dairy' in user_input.allergies, user_input.ingredients, num_recommendations=5)
    
    response_data = [{'id': idx, 'food': food} for idx, food in zip(recommendations.index, recommendations['food'])]
    return JSONResponse(content=response_data)


# Define a route to fetch food details based on food name
@app.get("/fetch-food-details/")
async def fetch_food_details(food: str):
    details = fetch_food_data_from_mongodb(food, mongodb_url, mongodb_database, mongodb_collection)
    
    # Convert ObjectId to string
    if '_id' in details:
        details['_id'] = str(details['_id'])

    return details

# Calculate the cosine similarity matrix
cosine_sim = cosine_similarity(X, X)

def recommend_food_by_search(food_name, df, cosine_sim):
    # Convert the input food name to lowercase
    food_name_lower = food_name.lower()
    
    # Find the index of the closest matching food item
    idx = df[df['food'].str.lower().str.contains(food_name_lower)].index[0]
    
    # Get the pairwise similarity scores with other food items
    sim_scores = list(enumerate(cosine_sim[idx]))
    
    # Sort the food items based on the similarity scores
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    # Get the scores of the 5 most similar food items
    sim_scores = sim_scores[1:6]
    
    # Get the food indices
    food_indices = [i[0] for i in sim_scores]
    
    # Return the top 5 most similar food items along with their IDs
    return [(df.iloc[idx]['food'], df.index[idx]) for idx in food_indices]

# Add a new API endpoint for food search
@app.post("/food_search/")
async def food_search(food_name: str):
    try:
        recommendations = recommend_food_by_search(food_name, df, cosine_sim)
        response_data = [{'id': item[1], 'food': item[0]} for item in recommendations]
        return JSONResponse(content=response_data)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Food item '{food_name}' not found.")
    
# Run the FastAPI application with Uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
