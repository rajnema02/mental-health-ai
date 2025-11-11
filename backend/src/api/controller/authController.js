const jwt = require('jsonwebtoken');
const Official = require('../models/official');

// Helper to generate an ADMIN token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_OFFICIAL, {
    expiresIn: '1d',
  });
};

// @desc    Authenticate official & get token
exports.loginOfficial = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if official exists
    const official = await Official.findOne({ email });

    if (official && (await official.comparePassword(password))) {
      res.json({
        _id: official._id,
        name: official.name, // <-- ADDED NAME
        email: official.email,
        token: generateToken(official._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};