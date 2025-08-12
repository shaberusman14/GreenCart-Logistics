const express = require('express');
const Driver = require('../models/Driver');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const drivers = await Driver.getAll();
    res.json(drivers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const driver = await Driver.update(req.params.id, req.body);
    res.json(driver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Driver.delete(req.params.id);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;