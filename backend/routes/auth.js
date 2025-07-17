const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret, expiresIn } = require('../config/auth');

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email/password required' });
  let user = await User.findOne({ email });
  if (user) return res.status(400).json({ message: 'Email in use' });
  user = await new User({ firstName, lastName, email, password }).save();
  res.status(201).json({ message: 'Registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.compare(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, secret, { expiresIn });
  res.json({ token });
});

module.exports = router;
