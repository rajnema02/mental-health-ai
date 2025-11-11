const DataPoint = require('../models/DataPoint');

// @desc    Get last 1000 data points
exports.getInitialLoad = async (req, res) => {
  try {
    const dataPoints = await DataPoint.find()
      .sort({ timestamp: -1 }) // Get the newest first
      .limit(1000)
      .select('location_geo emotion risk_level'); // Only select what map needs

    res.json(dataPoints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get aggregated stats for charts
exports.getDashboardStats = async (req, res) => {
  try {
    // Get stats for the last 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // 1. Topic Count
    const topicStats = await DataPoint.aggregate([
      { $match: { timestamp: { $gte: twentyFourHoursAgo } } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // 2. Emotion trend (hourly)
    const emotionStats = await DataPoint.aggregate([
      { $match: { timestamp: { $gte: twentyFourHoursAgo } } },
      {
        $group: {
          _id: {
            hour: { $hour: '$timestamp' },
            emotion: '$emotion',
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.hour': 1 } },
    ]);

    res.json({ topicStats, emotionStats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};