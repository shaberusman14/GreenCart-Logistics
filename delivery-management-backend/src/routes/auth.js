const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash('admin123', 10); // In production, store in DB
  if (username === 'admin' && await bcrypt.compare(password, hashedPassword)) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;