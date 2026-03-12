const express = require('express');
const router = express.Router();
const {
  getAllBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness
} = require('../controllers/businessController');
const { auth, isAdmin } = require('../middleware/auth');

router.get('/', auth, isAdmin, getAllBusinesses);
router.get('/:id', getBusiness);
router.post('/', auth, createBusiness);
router.put('/:id', auth, updateBusiness);
router.delete('/:id', auth, deleteBusiness);

module.exports = router;
