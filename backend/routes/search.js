const express = require('express');
const router = express.Router();
const { searchNearby, getCategories } = require('../controllers/searchController');

router.get('/nearby', searchNearby);
router.get('/categories', getCategories);

module.exports = router;
