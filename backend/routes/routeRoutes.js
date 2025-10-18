const express = require('express');
const router = express.Router();
const { getRoutes, addRoute, deleteRoute } = require('../controllers/routeController');

router.get('/', getRoutes);
router.post('/', addRoute);
router.delete('/:id', deleteRoute);

module.exports = router;
