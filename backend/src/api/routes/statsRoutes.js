const express = require("express");
const router = express.Router();

const adminMiddleware = require("../middleware/adminMiddleware");
const { getInitialLoad, getDashboardStats } = require("../controller/statsController");

// Protected Admin Routes
router.get("/initial-load", adminMiddleware, getInitialLoad);
router.get("/dashboard", adminMiddleware, getDashboardStats);

module.exports = router;
