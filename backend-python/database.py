from pymongo import MongoClient, GEOSPHERE
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/local_business")

client = MongoClient(MONGODB_URI)
db = client.get_database()

# Collections
users_collection = db["users"]
businesses_collection = db["businesses"]
reviews_collection = db["reviews"]
interactions_collection = db["interactions"]
search_history_collection = db["search_history"]

# Create geospatial index
businesses_collection.create_index([("location", GEOSPHERE)])

# Create indexes for ML
interactions_collection.create_index([("business_id", 1), ("timestamp", -1)])
search_history_collection.create_index([("timestamp", -1)])

def get_database():
    return db
