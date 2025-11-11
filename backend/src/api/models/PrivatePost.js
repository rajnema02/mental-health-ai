const mongoose = require('mongoose');

const privatePostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // We'll store the URL from our file upload (e.g., Cloudinary)
      required: true,
    },
    // The private analysis result
    analysis: {
      emotion: String,
      topic: String,
      risk_level: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PrivatePost', privatePostSchema);