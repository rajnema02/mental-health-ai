const ingestService = require('./ingestService');
const { anonymizeData } = require('./anonymizer');
const { analyzePost } = require('../services/aiAnalyzer');
const { broadcastDataPoint } = require('../services/socketManager');
const { checkAlerts } = require('./alertChecker');
const DataPoint = require('../api/models/DataPoint');

const start = () => {
  console.log('Data Pipeline is listening for new posts...');

  ingestService.on('new-post', async (post) => {
    try {
      // 1. Anonymize
      const anonymized = anonymizeData(post);

      // 2. Analyze (The AI call)
      const analysis = await analyzePost(anonymized.caption, anonymized.image_url);

      // 3. Create DataPoint
      const newDataPoint = new DataPoint({
        timestamp: anonymized.original_timestamp,
        location_district: anonymized.location_district,
        location_geo: anonymized.location_geo,
        emotion: analysis.emotion,
        topic: analysis.topic,
        risk_level: analysis.risk_level,
        hasImage: analysis.hasImage,
      });

      // 4. Save to DB
      await newDataPoint.save();

      // 5. Broadcast ANONYMOUS data to admin dashboard
      // Note: We do NOT broadcast user-submitted private posts here.
      // That is handled in userPostController.
      broadcastDataPoint(newDataPoint);

      // 6. Check for Alerts
      checkAlerts(newDataPoint);

    } catch (error) {
      console.error('Error in processing pipeline:', error);
    }
  });
};

module.exports = {
  start,
};