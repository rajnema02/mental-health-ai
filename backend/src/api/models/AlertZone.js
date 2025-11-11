const mongoose = require('mongoose');

const alertZoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // GeoJSON polygon. A circle is more complex, so we'll use a box (Polygon)
    // A client can draw a box and send the 4 corner coordinates
    zone: {
      type: {
        type: String,
        enum: ['Polygon'],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], // Array of arrays of [lon, lat] pairs
        required: true,
      },
    },
    // The "Health Official" who created this alert
    official: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Official',
      required: true,
    },
    // e.g., send alert if more than 10 "high" risk events occur in 1 hour
    threshold_count: {
        type: Number,
        default: 10
    },
    threshold_risk: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'high'
    },
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
alertZoneSchema.index({ zone: '2dsphere' });

module.exports = mongoose.model('AlertZone', alertZoneSchema);