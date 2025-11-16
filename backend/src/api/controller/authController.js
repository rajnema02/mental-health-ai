// controllers/officialAuthController.js
const Official = require("../models/official");
const jwt = require("jsonwebtoken");

// Create Admin Token
const generateAdminToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_OFFICIAL, {
    expiresIn: "7d",
  });
};

// =========================================
//  Admin Signup
// =========================================
exports.registerOfficial = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if already exists
    const exists = await Official.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create new admin
    const admin = await Official.create({
      name,
      email,
      password,
      role: "admin",
    });

    // SUCCESS RESPONSE FORMAT (REQUIRED BY REDUX)
    return res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
      token: generateAdminToken(admin._id),
    });

  } catch (err) {
    console.error("ADMIN SIGNUP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// =========================================
//  Admin Login
// =========================================
exports.loginOfficial = async (req, res) => {
  const { email, password } = req.body;

  try {
    const official = await Official.findOne({ email });

    if (official && (await official.comparePassword(password))) {
      return res.json({
        _id: official._id,
        name: official.name,
        email: official.email,
        role: "admin",
        token: generateAdminToken(official._id),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
