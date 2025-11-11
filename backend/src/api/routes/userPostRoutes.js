const express = require('express');
const router = express.Router();
const {
  analyzeNewPost,
  getMyPostHistory,
} = require('../controller/userPostController');
const userAuthMiddleware = require('../middleware/userAuthMiddleware');

// @route   POST /api/posts/analyze
// @desc    Analyze a new post (image + caption)
// @access  Private (User)
router.post('/analyze', userAuthMiddleware, analyzeNewPost);

// @route   GET /api/posts/my-history
// @desc    Get the logged-in user's private post history
// @access  Private (User)
router.get('/my-history', userAuthMiddleware, getMyPostHistory);

module.exports = router;