const jwt = require('jsonwebtoken');
const { secret } = require('../config/auth');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const data = jwt.verify(token, secret);
    req.user = await User.findById(data.id).select('-password');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};