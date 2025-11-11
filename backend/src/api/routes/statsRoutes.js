const express = require('express');
const router = express.Router();
const {
  getInitialLoad,
  getDashboardStats,
} = require('../controller/statsController');

// @route   GET /api/stats/initial-load
// @desc    Get last 1000 data points for map
router.get('/initial-load', getInitialLoad);

// @route   GET /api/stats/dashboard
// @desc    Get aggregated stats for charts
router.get('/dashboard', getDashboardStats);

module.exports = router;