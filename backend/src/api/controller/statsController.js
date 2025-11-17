import DataPoint from "../models/DataPoint.js";

export const getInitialLoad = async (req, res) => {
  const points = await DataPoint.find()
    .sort({ timestamp: -1 })
    .limit(1000)
    .select("location_geo emotion risk_level topic");

  res.json(points);
};

export const getDashboardStats = async (req, res) => {
  const last24h = new Date(Date.now() - 24 * 3600 * 1000);

  const topicStats = await DataPoint.aggregate([
    { $match: { timestamp: { $gte: last24h } } },
    { $group: { _id: "$topic", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  const emotionStats = await DataPoint.aggregate([
    { $match: { timestamp: { $gte: last24h } } },
    {
      $group: {
        _id: { hour: { $hour: "$timestamp" }, emotion: "$emotion" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.hour": 1 } },
  ]);

  res.json({ topicStats, emotionStats });
};
