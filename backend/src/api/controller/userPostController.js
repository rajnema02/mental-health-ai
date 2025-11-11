const PrivatePost = require('../models/PrivatePost');
const DataPoint = require('../models/DataPoint');
const { analyzePost } = require('../../services/aiAnalyzer');
const { broadcastDataPoint } = require('../../services/socketManager');
const { checkAlerts } = require('../../pipeline/alertChecker');

// @desc    Analyze a new post (image + caption)
exports.analyzeNewPost = async (req, res) => {
  const { caption, imageUrl, location } = req.body;
  // In a real app, 'imageUrl' would come from a multer upload,
  // and 'location' (lat/lon) would come from the browser.

  if (!caption || !imageUrl) {
    return res.status(400).json({ message: 'Caption and image URL are required' });
  }

  try {
    // 1. Call the AI Analyzer
    const analysis = await analyzePost(caption, imageUrl);

    // 2. Create and save the PRIVATE post
    const privatePost = await PrivatePost.create({
      user: req.user._id, // from userAuthMiddleware
      caption,
      imageUrl,
      analysis: {
        emotion: analysis.emotion,
        topic: analysis.topic,
        risk_level: analysis.risk_level,
      },
    });
    
    // 3. --- THIS IS THE CRITICAL HYBRID STEP ---
    // Now, create the ANONYMOUS data point for the admin map.
    
    // Mock location for the demo
    const mockLocation = {
      district: 'MP Nagar',
      geo: {
        type: 'Point',
        coordinates: [77.4364, 23.2339] // [lon, lat]
      }
    };

    const publicDataPoint = new DataPoint({
      timestamp: new Date(),
      location_district: mockLocation.district,
      location_geo: mockLocation.geo,
      emotion: analysis.emotion,
      topic: analysis.topic,
      risk_level: analysis.risk_level,
      hasImage: true,
    });

    await publicDataPoint.save();

    // 4. Broadcast the ANONYMOUS data to the admin dashboard
    broadcastDataPoint(publicDataPoint);

    // 5. Check alerts with the ANONYMOUS data
    checkAlerts(publicDataPoint);

    // 6. Return the PRIVATE analysis to the user
    res.status(201).json(privatePost);

  } catch (error) {
    console.error('Error analyzing post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get the logged-in user's private post history
exports.getMyPostHistory = async (req, res) => {
  try {
    const posts = await PrivatePost.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};