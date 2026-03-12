from datetime import datetime

def calculate_business_score(business: dict, distance: float, max_distance: int = 500) -> float:
    """Smart Ranking Algorithm"""
    
    # Distance score (closer = higher)
    distance_score = max(0, (1 - distance / max_distance)) * 100
    
    # Recent activity score
    recent_activity = calculate_recent_activity(business.get("updated_at"))
    
    # Review authenticity score
    review_auth = calculate_review_authenticity(
        business.get("rating", 0),
        business.get("review_count", 0)
    )
    
    # Weighted scoring
    score = (distance_score * 0.5) + (recent_activity * 0.2) + (review_auth * 0.3)
    
    return round(score, 2)

def calculate_recent_activity(updated_at) -> float:
    if not updated_at:
        return 50
    
    days_since_update = (datetime.utcnow() - updated_at).days
    
    if days_since_update < 7:
        return 100
    elif days_since_update < 30:
        return 80
    elif days_since_update < 90:
        return 60
    return 40

def calculate_review_authenticity(rating: float, review_count: int) -> float:
    if review_count == 0:
        return 50
    
    rating_score = (rating / 5) * 100
    count_bonus = min(review_count * 2, 30)
    
    return min(rating_score + count_bonus, 100)
