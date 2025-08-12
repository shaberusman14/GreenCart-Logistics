const express = require('express');
const Route = require('../models/Route');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const routes = await Route.getAll();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const route = await Route.create(req.body);
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const route = await Route.update(req.params.id, req.body);
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Route.delete(req.params.id);
    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
