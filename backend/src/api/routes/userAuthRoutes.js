const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controller/userAuthController');

// @route   POST /api/auth/user/signup
// @desc    Register a new public user
// @access  Public
router.post('/signup', registerUser);

// @route   POST /api/auth/user/login
// @desc    Authenticate a public user & get token
// @access  Public
router.post('/login', loginUser);

module.exports = router;