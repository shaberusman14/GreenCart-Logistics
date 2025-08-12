const express = require('express');
const Simulation = require('../models/Simulation');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const results = await Simulation.run(req.body);
    res.json(results);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await Simulation.getHistory();
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;