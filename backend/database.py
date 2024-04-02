from pymongo import MongoClient
import pandas as pd

def save_dataset_to_mongodb(dataset_file, mongodb_url, mongodb_database, mongodb_collection):
    # Read the dataset into a DataFrame
    df = pd.read_csv(dataset_file)
    
    # Connect to MongoDB
    client = MongoClient(mongodb_url)
    
    # Access the specified database
    db = client[mongodb_database]
    
    # Access the specified collection
    collection = db[mongodb_collection]
    
    # Convert DataFrame to dictionary records
    records = df.to_dict(orient='records')
    
    # Insert records into the collection
    collection.insert_many(records)

def fetch_food_data_from_mongodb(food_name, mongodb_url, mongodb_database, mongodb_collection):
    # Connect to MongoDB
    client = MongoClient(mongodb_url)
    
    # Access the specified database
    db = client[mongodb_database]
    
    # Access the specified collection
    collection = db[mongodb_collection]
    
    # Query MongoDB based on food name
    result = collection.find_one({"food": food_name})
    
    # Convert the result to a dictionary
    if result:
        result = result.copy() # Create a shallow copy of the document
        result['_id'] = str(result['_id']) # Convert ObjectId to string
    
    return result



# Example usage
if __name__ == "__main__":
    # Save dataset to MongoDB
    dataset_file = "../data/dataset.csv"
    mongodb_url = "mongodb://localhost:27017/"
    mongodb_database = "food_database"
    mongodb_collection = "food_collection"
    
    save_dataset_to_mongodb(dataset_file, mongodb_url, mongodb_database, mongodb_collection)
    
    # Fetch food data from MongoDB
    food_name = "Grilled Caesar Salad"
    result = fetch_food_data_from_mongodb(food_name, mongodb_url, mongodb_database, mongodb_collection)
    print(result)
