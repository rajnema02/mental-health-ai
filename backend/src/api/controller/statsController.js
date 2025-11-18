import UserPost from "../models/UserPosts.js";

export const getInitialLoad = async (req, res) => {
  try {
    // GET MAP DATA
    const mapData = await UserPost.find(
      { "location_geo.coordinates": { $exists: true } },
      {
        caption: 1,
        ai_result: 1,
        topic: 1,
        location_geo: 1,
        createdAt: 1
      }
    )
      .sort({ createdAt: -1 })
      .limit(200);

    // Dummy stats (your old logic)
    const stats = {
      topTopics: [],
      hourlyEmotions: []
    };

    return res.json({
      mapData,
      stats
    });

  } catch (err) {
    console.error("INITIAL LOAD ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};



// GET /api/stats/dashboard
export const getDashboardStats = async (req, res) => {
  try {
    // TOPICS: top topics in last 24 hours
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const topicStats = await UserPost.aggregate([
      { $match: { createdAt: { $gte: since }, topic: { $exists: true, $ne: null } } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    // EMOTION STATS: count per hour for each emotion (last 24 hours)
    const emotionStats = await UserPost.aggregate([
      { $match: { createdAt: { $gte: since }, 'ai_result.emotion': { $exists: true } } },
      {
        $project: {
          hour: { $hour: { date: '$createdAt', timezone: 'UTC' } },
          emotion: '$ai_result.emotion',
        },
      },
      {
        $group: {
          _id: { hour: '$hour', emotion: '$emotion' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.hour': 1, count: -1 } },
    ]);

    return res.json({ topicStats, emotionStats });
  } catch (err) {
    console.error('GET DASHBOARD STATS ERROR:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
