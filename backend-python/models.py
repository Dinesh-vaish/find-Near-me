from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    phone: Optional[str] = None
    role: str = "user"

class UserLogin(BaseModel):
    email: str
    password: str

class BusinessCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    address: str
    latitude: float
    longitude: float
    phone: Optional[str] = None
    open_time: Optional[str] = None
    close_time: Optional[str] = None

class BusinessResponse(BaseModel):
    id: str
    name: str
    category: str
    address: str
    distance: Optional[float] = None
    score: Optional[float] = None
    rating: float = 0.0
    review_count: int = 0
