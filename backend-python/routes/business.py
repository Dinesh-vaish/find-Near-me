from fastapi import APIRouter, HTTPException
from models import BusinessCreate
from database import businesses_collection
from bson import ObjectId
from datetime import datetime
from websocket_manager import manager

router = APIRouter()

@router.post("/")
async def create_business(business: BusinessCreate):
    business_dict = {
        "name": business.name,
        "category": business.category,
        "description": business.description,
        "address": business.address,
        "location": {
            "type": "Point",
            "coordinates": [business.longitude, business.latitude]
        },
        "contact": {"phone": business.phone},
        "timings": {"open": business.open_time, "close": business.close_time},
        "rating": 0.0,
        "review_count": 0,
        "status": "pending",
        "verified": False,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = businesses_collection.insert_one(business_dict)
    
    # Real-time notification to admins
    business_dict["id"] = str(result.inserted_id)
    await manager.notify_pending_approval(business_dict)
    
    return {
        "success": True,
        "message": "Business created and pending approval",
        "id": str(result.inserted_id)
    }

@router.get("/{business_id}")
def get_business(business_id: str):
    try:
        business = businesses_collection.find_one({"_id": ObjectId(business_id)})
        if not business:
            raise HTTPException(status_code=404, detail="Business not found")
        
        business["id"] = str(business["_id"])
        del business["_id"]
        return {"success": True, "data": business}
    except:
        raise HTTPException(status_code=400, detail="Invalid business ID")
