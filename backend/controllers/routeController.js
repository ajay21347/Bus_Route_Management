const mongoose = require('mongoose'); // <-- ADD THIS LINE
const Route = require('../models/Route');

// Get all routes
exports.getRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/// Add new route
exports.addRoute = async (req, res) => {
    try {
        const { name, source, destination, duration, stops } = req.body;

        // Validate required fields
        if (!name || !source || !destination || !duration) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Convert duration to number
        const numericDuration = Number(duration);
        if (isNaN(numericDuration)) {
            return res.status(400).json({ message: 'Duration must be a number' });
        }

        // Ensure stops is an array
        const stopsArray = stops && Array.isArray(stops) ? stops : [];

        const route = new Route({
            name,
            source,
            destination,
            duration: numericDuration,
            stops: stopsArray
        });

        const savedRoute = await route.save();
        res.status(201).json(savedRoute);
    } catch (err) {
        console.error('Add Route Error:', err.message);
        res.status(400).json({ message: err.message });
    }
};


// Delete a route
exports.deleteRoute = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid route ID format' });
        }

        const route = await Route.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        await route.deleteOne();
        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error: ' + err.message });
    }
};
