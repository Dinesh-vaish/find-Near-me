from fastapi import APIRouter, HTTPException, Header
from database import businesses_collection, users_collection, reviews_collection
from utils.auth import decode_token
from bson import ObjectId
from datetime import datetime, timedelta
from websocket_manager import manager

router = APIRouter()

# Middleware to check admin
def verify_admin(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No token provided")
    
    token = authorization.replace("Bearer ", "")
    payload = decode_token(token)
    
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return user

# Get Dashboard Stats
@router.get("/stats")
def get_stats(authorization: str = Header(None)):
    verify_admin(authorization)
    
    total_businesses = businesses_collection.count_documents({})
    pending_businesses = businesses_collection.count_documents({"status": "pending"})
    approved_businesses = businesses_collection.count_documents({"status": "approved"})
    total_users = users_collection.count_documents({})
    total_reviews = reviews_collection.count_documents({})
    
    # Recent activity (last 7 days)
    week_ago = datetime.utcnow() - timedelta(days=7)
    recent_businesses = businesses_collection.count_documents({
        "created_at": {"$gte": week_ago}
    })
    
    return {
        "success": True,
        "data": {
            "total_businesses": total_businesses,
            "pending_businesses": pending_businesses,
            "approved_businesses": approved_businesses,
            "total_users": total_users,
            "total_reviews": total_reviews,
            "recent_businesses": recent_businesses
        }
    }

# Get Pending Businesses
@router.get("/businesses/pending")
def get_pending_businesses(authorization: str = Header(None)):
    verify_admin(authorization)
    
    businesses = list(businesses_collection.find({"status": "pending"}))
    
    result = []
    for business in businesses:
        business["id"] = str(business["_id"])
        del business["_id"]
        result.append(business)
    
    return {"success": True, "data": result}

# Approve Business
@router.put("/businesses/{business_id}/approve")
async def approve_business(business_id: str, authorization: str = Header(None)):
    verify_admin(authorization)
    
    try:
        result = businesses_collection.update_one(
            {"_id": ObjectId(business_id)},
            {"$set": {"status": "approved", "verified": True}}
        )
        
        if result.modified_count > 0:
            # Get business data
            business = businesses_collection.find_one({"_id": ObjectId(business_id)})
            business["id"] = str(business["_id"])
            
            # Real-time notification
            await manager.notify_business_approved(business)
            await manager.update_heatmap()
            
            return {"success": True, "message": "Business approved"}
        else:
            raise HTTPException(status_code=404, detail="Business not found")
    except:
        raise HTTPException(status_code=400, detail="Invalid business ID")

# Reject Business
@router.put("/businesses/{business_id}/reject")
def reject_business(business_id: str, authorization: str = Header(None)):
    verify_admin(authorization)
    
    try:
        result = businesses_collection.update_one(
            {"_id": ObjectId(business_id)},
            {"$set": {"status": "rejected"}}
        )
        
        if result.modified_count > 0:
            return {"success": True, "message": "Business rejected"}
        else:
            raise HTTPException(status_code=404, detail="Business not found")
    except:
        raise HTTPException(status_code=400, detail="Invalid business ID")

# Delete Business
@router.delete("/businesses/{business_id}")
def delete_business(business_id: str, authorization: str = Header(None)):
    verify_admin(authorization)
    
    try:
        result = businesses_collection.delete_one({"_id": ObjectId(business_id)})
        
        if result.deleted_count > 0:
            return {"success": True, "message": "Business deleted"}
        else:
            raise HTTPException(status_code=404, detail="Business not found")
    except:
        raise HTTPException(status_code=400, detail="Invalid business ID")

# Get All Businesses
@router.get("/businesses")
def get_all_businesses(authorization: str = Header(None)):
    verify_admin(authorization)
    
    businesses = list(businesses_collection.find().sort("created_at", -1))
    
    result = []
    for business in businesses:
        business["id"] = str(business["_id"])
        del business["_id"]
        result.append(business)
    
    return {"success": True, "data": result}

# Get Heatmap Data
@router.get("/heatmap")
def get_heatmap_data(authorization: str = Header(None)):
    verify_admin(authorization)
    
    businesses = list(businesses_collection.find({"status": "approved"}))
    
    heatmap_data = []
    for business in businesses:
        coords = business["location"]["coordinates"]
        heatmap_data.append({
            "lat": coords[1],
            "lng": coords[0],
            "name": business["name"],
            "category": business["category"]
        })
    
    return {"success": True, "data": heatmap_data}

# Get Category Distribution
@router.get("/analytics/categories")
def get_category_analytics(authorization: str = Header(None)):
    verify_admin(authorization)
    
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    
    result = list(businesses_collection.aggregate(pipeline))
    
    categories = [{"category": item["_id"], "count": item["count"]} for item in result]
    
    return {"success": True, "data": categories}

# Get All Users
@router.get("/users")
def get_all_users(authorization: str = Header(None)):
    verify_admin(authorization)
    
    users = list(users_collection.find().sort("created_at", -1))
    
    result = []
    for user in users:
        user["id"] = str(user["_id"])
        del user["_id"]
        del user["password"]  # Don't send passwords
        result.append(user)
    
    return {"success": True, "data": result}
