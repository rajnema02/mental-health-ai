const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate a USER token
const generateUserToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_USER, {
    expiresIn: '7d',
  });
};

// @desc    Register a new public user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body; // <-- ADDED NAME

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name, // <-- ADDED NAME
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name, // <-- ADDED NAME
        email: user.email,
        token: generateUserToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate a public user & get token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name, // <-- ADDED NAME
        email: user.email,
        token: generateUserToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};