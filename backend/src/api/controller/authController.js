// controllers/officialAuthController.js
const jwt = require("jsonwebtoken");
const Official = require("../models/official");

// Helper to generate ADMIN token
const generateOfficialToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_OFFICIAL, {
    expiresIn: "7d",
  });
};

// =========================================
//  Admin Signup
// =========================================
exports.registerOfficial = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if admin already exists
    const existingOfficial = await Official.findOne({ email });
    if (existingOfficial) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create admin
    const official = await Official.create({
      name,
      email,
      password,
    });

    if (official) {
      res.status(201).json({
        _id: official._id,
        name: official.name,
        email: official.email,
        token: generateOfficialToken(official._id),
      });
    } else {
      res.status(400).json({ message: "Invalid admin data" });
    }
  } catch (error) {
    console.error("Admin Signup Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================================
//  Admin Login
// =========================================
exports.loginOfficial = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const official = await Official.findOne({ email });

    if (official && (await official.comparePassword(password))) {
      res.json({
        _id: official._id,
        name: official.name,
        email: official.email,
        token: generateOfficialToken(official._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
