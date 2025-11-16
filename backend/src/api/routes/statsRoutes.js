const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const { getInitialLoad, getDashboardStats } = require('../controller/statsController');

router.get('/initial-load', authMiddleware, getInitialLoad);
router.get('/dashboard', authMiddleware, getDashboardStats);

module.exports = router;
