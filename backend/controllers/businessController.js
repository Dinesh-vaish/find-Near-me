const Business = require('../models/Business');

// Get all businesses (admin)
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find().populate('owner', 'name email');
    res.json({ success: true, data: businesses });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single business
exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id).populate('owner', 'name email');
    
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create business
exports.createBusiness = async (req, res) => {
  try {
    const businessData = {
      ...req.body,
      owner: req.user._id,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      }
    };

    const business = await Business.create(businessData);
    res.status(201).json({ success: true, data: business });
  } catch (error) {
    res.status(400).json({ message: 'Error creating business', error: error.message });
  }
};

// Update business
exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Check ownership
    if (business.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updated = await Business.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ message: 'Error updating business' });
  }
};

// Delete business
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    if (business.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await business.deleteOne();
    res.json({ success: true, message: 'Business deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
