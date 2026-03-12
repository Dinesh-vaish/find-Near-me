const Business = require('../models/Business');
const { calculateDistance } = require('../utils/haversine');
const { calculateBusinessScore } = require('../utils/ranking');

// Search nearby businesses
exports.searchNearby = async (req, res) => {
  try {
    const { latitude, longitude, radius = 500, category } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude required' });
    }

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const maxDistance = parseInt(radius);

    // Build query
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lon, lat]
          },
          $maxDistance: maxDistance
        }
      },
      status: 'approved'
    };

    if (category) {
      query.category = category;
    }

    // Find businesses
    let businesses = await Business.find(query).limit(50);

    // Calculate distance and score for each business
    businesses = businesses.map(business => {
      const distance = calculateDistance(
        lat, lon,
        business.location.coordinates[1],
        business.location.coordinates[0]
      );

      const businessObj = business.toObject();
      businessObj.distance = Math.round(distance);
      businessObj.score = calculateBusinessScore(businessObj, { lat, lon }, maxDistance);

      return businessObj;
    });

    // Sort by score (highest first)
    businesses.sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      count: businesses.length,
      data: businesses
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get business categories
exports.getCategories = async (req, res) => {
  try {
    const categories = [
      'coaching', 'kirana', 'plumber', 'electrician', 
      'salon', 'restaurant', 'medical', 'other'
    ];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
