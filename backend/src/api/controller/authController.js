import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Official from "../models/official.js";

// --------------------------------------------------
// Generate Tokens Safely
// --------------------------------------------------
const userToken = (id) => {
  if (!process.env.JWT_SECRET_USER) {
    throw new Error("JWT_SECRET_USER is missing in .env");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET_USER, {
    expiresIn: "7d",
  });
};

const adminToken = (id) => {
  if (!process.env.JWT_SECRET_ADMIN) {
    throw new Error("JWT_SECRET_ADMIN is missing in .env");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET_ADMIN, {
    expiresIn: "1d",
  });
};

// --------------------------------------------------
// USER SIGNUP
// --------------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: userToken(user._id),
    });
  } catch (err) {
    console.error("REGISTER USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// USER LOGIN
// --------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: userToken(user._id),
    });
  } catch (err) {
    console.error("LOGIN USER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// ADMIN SIGNUP
// --------------------------------------------------
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Official.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const admin = await Official.create({ name, email, password });

    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: adminToken(admin._id),
    });
  } catch (err) {
    console.error("REGISTER ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// ADMIN LOGIN
// --------------------------------------------------
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Official.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: adminToken(admin._id),
    });
  } catch (err) {
    console.error("LOGIN ADMIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
