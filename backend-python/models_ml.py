from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserInteraction(BaseModel):
    user_id: Optional[str] = None
    business_id: str
    interaction_type: str  # click, view, call, navigate
    search_query: Optional[str] = None
    distance: float
    category: str
    timestamp: datetime = None

class SearchHistory(BaseModel):
    user_id: Optional[str] = None
    query: str
    category: Optional[str] = None
    latitude: float
    longitude: float
    radius: int
    results_count: int
    timestamp: datetime = None
