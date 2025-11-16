// routes/officialAuthRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerOfficial,
  loginOfficial,
} = require("../controller/authController");

// Admin Signup
router.post("/signup", registerOfficial);

// Admin Login
router.post("/login", loginOfficial);

module.exports = router;
