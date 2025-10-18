const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    duration: { type: Number, required: true }, // duration in minutes
    stops: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Route', routeSchema);
