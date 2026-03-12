from fastapi import APIRouter, HTTPException
from models_ml import UserInteraction, SearchHistory
from database import interactions_collection, search_history_collection
from datetime import datetime

router = APIRouter()

# Track User Interaction
@router.post("/track")
def track_interaction(interaction: UserInteraction):
    """Track user interactions for ML ranking"""
    
    interaction_data = interaction.dict()
    interaction_data['timestamp'] = datetime.utcnow()
    
    interactions_collection.insert_one(interaction_data)
    
    return {"success": True, "message": "Interaction tracked"}

# Track Search History
@router.post("/search-history")
def track_search(search: SearchHistory):
    """Track search queries for analytics"""
    
    search_data = search.dict()
    search_data['timestamp'] = datetime.utcnow()
    
    search_history_collection.insert_one(search_data)
    
    return {"success": True, "message": "Search tracked"}

# Get Business Analytics
@router.get("/analytics/{business_id}")
def get_business_analytics(business_id: str):
    """Get interaction analytics for a business"""
    
    total_views = interactions_collection.count_documents({
        'business_id': business_id,
        'interaction_type': 'view'
    })
    
    total_clicks = interactions_collection.count_documents({
        'business_id': business_id,
        'interaction_type': 'click'
    })
    
    total_calls = interactions_collection.count_documents({
        'business_id': business_id,
        'interaction_type': 'call'
    })
    
    total_navigations = interactions_collection.count_documents({
        'business_id': business_id,
        'interaction_type': 'navigate'
    })
    
    click_rate = (total_clicks / total_views * 100) if total_views > 0 else 0
    
    return {
        "success": True,
        "data": {
            "views": total_views,
            "clicks": total_clicks,
            "calls": total_calls,
            "navigations": total_navigations,
            "click_rate": round(click_rate, 2)
        }
    }

# Get Popular Searches
@router.get("/popular-searches")
def get_popular_searches(limit: int = 10):
    """Get most popular search queries"""
    
    pipeline = [
        {"$group": {"_id": "$query", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": limit}
    ]
    
    results = list(search_history_collection.aggregate(pipeline))
    
    popular = [{"query": r["_id"], "count": r["count"]} for r in results]
    
    return {"success": True, "data": popular}
