// Smart Ranking Algorithm
function calculateBusinessScore(business, userLocation, maxDistance = 500) {
  const distance = business.distance || 0;
  const recentActivity = calculateRecentActivity(business.updatedAt);
  const reviewAuth = calculateReviewAuthenticity(business.rating, business.reviewCount);

  // Distance weight (closer = higher score)
  const distanceScore = Math.max(0, (1 - distance / maxDistance)) * 100;
  
  // Weighted scoring
  const score = (distanceScore * 0.5) + 
                (recentActivity * 0.2) + 
                (reviewAuth * 0.3);

  return Math.round(score * 100) / 100;
}

function calculateRecentActivity(updatedAt) {
  const daysSinceUpdate = (Date.now() - new Date(updatedAt)) / (1000 * 60 * 60 * 24);
  
  if (daysSinceUpdate < 7) return 100;
  if (daysSinceUpdate < 30) return 80;
  if (daysSinceUpdate < 90) return 60;
  return 40;
}

function calculateReviewAuthenticity(rating, reviewCount) {
  if (reviewCount === 0) return 50;
  
  const ratingScore = (rating / 5) * 100;
  const countBonus = Math.min(reviewCount * 2, 30);
  
  return Math.min(ratingScore + countBonus, 100);
}

module.exports = { calculateBusinessScore };
