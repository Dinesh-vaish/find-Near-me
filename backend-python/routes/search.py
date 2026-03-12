from fastapi import APIRouter, Query
from database import businesses_collection
from utils.haversine import calculate_distance
from ml.ranking_model import ml_model

router = APIRouter()

@router.get("/nearby")
def search_nearby(
    latitude: float = Query(...),
    longitude: float = Query(...),
    radius: int = Query(500),
    category: str = Query(None)
):
    # Build query
    query = {
        "location": {
            "$near": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [longitude, latitude]
                },
                "$maxDistance": radius
            }
        },
        "status": "approved"
    }
    
    if category:
        query["category"] = category
    
    # Find businesses
    businesses = list(businesses_collection.find(query).limit(50))
    
    # Calculate distance and ML-based score
    results = []
    for business in businesses:
        coords = business["location"]["coordinates"]
        distance = calculate_distance(latitude, longitude, coords[1], coords[0])
        
        # Extract ML features
        features = ml_model.calculate_features(
            business, 
            distance, 
            {'latitude': latitude, 'longitude': longitude}
        )
        
        # Predict score using ML model
        ml_score = ml_model.predict_score(features)
        
        business_data = {
            "id": str(business["_id"]),
            "name": business["name"],
            "category": business["category"],
            "address": business["address"],
            "location": business["location"],
            "contact": business.get("contact", {}),
            "timings": business.get("timings", {}),
            "rating": business.get("rating", 0),
            "review_count": business.get("review_count", 0),
            "distance": round(distance),
            "score": ml_score,
            "ml_features": features  # Include features for transparency
        }
        results.append(business_data)
    
    # Sort by score
    results.sort(key=lambda x: x["score"], reverse=True)
    
    return {
        "success": True,
        "count": len(results),
        "data": results
    }

@router.get("/categories")
def get_categories():
    categories = [
        "coaching", "kirana", "plumber", "electrician",
        "salon", "restaurant", "medical", "other"
    ]
    return {"success": True, "data": categories}
