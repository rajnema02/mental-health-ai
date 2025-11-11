const express = require('express');
const router = express.Router();
const { loginOfficial } = require('../controller/authController');

// @route   POST /api/auth/official/login
// @desc    Authenticate official & get token
// @access  Public
router.post('/login', loginOfficial);

module.exports = router;