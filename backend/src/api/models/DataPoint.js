const mongoose = require('mongoose');

const dataPointSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
    },
    location_district: {
      type: String,
      required: true,
    },
    // GeoJSON point for map queries
    location_geo: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
    emotion: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      default: 'unknown',
    },
    hasImage: {
      type: Boolean,
      default: false,
    },
    // The "mismatch" or high-risk flag
    risk_level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    }
  },
  { timestamps: true }
);

// Create a 2dsphere index for geospatial queries
dataPointSchema.index({ location_geo: '2dsphere' });

module.exports = mongoose.model('DataPoint', dataPointSchema);