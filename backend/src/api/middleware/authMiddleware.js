const Official = require('../models/official');   // FIX: use correct model name
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/env');

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, jwtSecret);

      // Load official user
      req.official = await Official.findById(decoded.id).select('-password');

      if (!req.official) {
        return res.status(401).json({ message: 'Not authorized: user not found' });
      }

      return next();   // SUCCESS
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized: token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized: no token' });
};

module.exports = authMiddleware;
