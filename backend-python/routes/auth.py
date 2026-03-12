from fastapi import APIRouter, HTTPException, Depends
from models import UserCreate, UserLogin
from database import users_collection
from utils.auth import hash_password, verify_password, create_access_token
from bson import ObjectId

router = APIRouter()

@router.post("/register")
def register(user: UserCreate):
    # Check if user exists
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_dict = user.dict()
    user_dict["password"] = hash_password(user.password)
    user_dict["created_at"] = user_dict["updated_at"] = None
    
    result = users_collection.insert_one(user_dict)
    
    # Create token
    token = create_access_token({"user_id": str(result.inserted_id)})
    
    return {
        "success": True,
        "token": token,
        "user": {
            "id": str(result.inserted_id),
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

@router.post("/login")
def login(credentials: UserLogin):
    user = users_collection.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"user_id": str(user["_id"])})
    
    return {
        "success": True,
        "token": token,
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }
