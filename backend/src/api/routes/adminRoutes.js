const express = require("express");
const router = express.Router();
const adminAuth = require("../middleware/adminMiddleware");

router.get("/validate", adminAuth, (req, res) => {
  res.json({ success: true, admin: req.official });
});

module.exports = router;
