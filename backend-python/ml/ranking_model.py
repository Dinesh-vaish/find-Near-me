from datetime import datetime, timedelta
from database import interactions_collection, businesses_collection
from bson import ObjectId

class MLRankingModel:
    """Machine Learning based ranking system"""
    
    def __init__(self):
        self.weights = {
            'distance': 0.30,
            'recent_activity': 0.15,
            'review_score': 0.20,
            'click_rate': 0.20,
            'engagement_score': 0.15
        }
    
    def calculate_features(self, business, distance, user_location):
        """Extract features for ML ranking"""
        
        # Feature 1: Distance Score (normalized)
        distance_score = max(0, 1 - (distance / 2000)) * 100
        
        # Feature 2: Recent Activity Score
        recent_activity = self._calculate_recent_activity(business.get('updated_at'))
        
        # Feature 3: Review Score
        review_score = self._calculate_review_score(
            business.get('rating', 0),
            business.get('review_count', 0)
        )
        
        # Feature 4: Click Rate (from user interactions)
        click_rate = self._calculate_click_rate(str(business['_id']))
        
        # Feature 5: Engagement Score
        engagement_score = self._calculate_engagement_score(str(business['_id']))
        
        return {
            'distance_score': distance_score,
            'recent_activity': recent_activity,
            'review_score': review_score,
            'click_rate': click_rate,
            'engagement_score': engagement_score
        }
    
    def predict_score(self, features):
        """Predict ranking score using weighted features"""
        
        score = (
            features['distance_score'] * self.weights['distance'] +
            features['recent_activity'] * self.weights['recent_activity'] +
            features['review_score'] * self.weights['review_score'] +
            features['click_rate'] * self.weights['click_rate'] +
            features['engagement_score'] * self.weights['engagement_score']
        )
        
        return round(score, 2)
    
    def _calculate_recent_activity(self, updated_at):
        """Calculate recent activity score"""
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
    
    def _calculate_review_score(self, rating, review_count):
        """Calculate review authenticity score"""
        if review_count == 0:
            return 50
        
        rating_score = (rating / 5) * 100
        count_bonus = min(review_count * 2, 30)
        
        return min(rating_score + count_bonus, 100)
    
    def _calculate_click_rate(self, business_id):
        """Calculate click-through rate from user interactions"""
        try:
            # Get interactions in last 30 days
            thirty_days_ago = datetime.utcnow() - timedelta(days=30)
            
            total_views = interactions_collection.count_documents({
                'business_id': business_id,
                'interaction_type': 'view',
                'timestamp': {'$gte': thirty_days_ago}
            })
            
            total_clicks = interactions_collection.count_documents({
                'business_id': business_id,
                'interaction_type': {'$in': ['click', 'call', 'navigate']},
                'timestamp': {'$gte': thirty_days_ago}
            })
            
            if total_views == 0:
                return 50  # Default score
            
            click_rate = (total_clicks / total_views) * 100
            return min(click_rate * 2, 100)  # Amplify and cap at 100
            
        except:
            return 50
    
    def _calculate_engagement_score(self, business_id):
        """Calculate overall engagement score"""
        try:
            # Get all interactions in last 30 days
            thirty_days_ago = datetime.utcnow() - timedelta(days=30)
            
            interactions = list(interactions_collection.find({
                'business_id': business_id,
                'timestamp': {'$gte': thirty_days_ago}
            }))
            
            if not interactions:
                return 50
            
            # Weight different interaction types
            interaction_weights = {
                'view': 1,
                'click': 3,
                'call': 5,
                'navigate': 4
            }
            
            total_score = sum(
                interaction_weights.get(i['interaction_type'], 1)
                for i in interactions
            )
            
            # Normalize to 0-100
            normalized_score = min((total_score / len(interactions)) * 20, 100)
            
            return normalized_score
            
        except:
            return 50
    
    def train_model(self):
        """Train model based on historical data (placeholder for future)"""
        # TODO: Implement actual ML training with scikit-learn
        # For now, we use weighted scoring
        pass
    
    def update_weights(self, new_weights):
        """Update model weights dynamically"""
        self.weights.update(new_weights)

# Global model instance
ml_model = MLRankingModel()
