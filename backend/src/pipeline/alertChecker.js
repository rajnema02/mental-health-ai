const AlertZone = require('../api/models/AlertZone');
const DataPoint = require('../api/models/DataPoint');
const Official = require('../api/models/official');
const { sendAlertEmail } = require('../services/emailService');

const checkAlerts = async (newDataPoint) => {
  try {
    // Find all alert zones that contain this new data point's location
    const matchingZones = await AlertZone.find({
      zone: {
        $geoIntersects: {
          $geometry: newDataPoint.location_geo,
        },
      },
    });

    if (matchingZones.length === 0) {
      return; // No alerts to check
    }

    for (const zone of matchingZones) {
      // Check if the new point meets the risk criteria for this zone
      if (newDataPoint.risk_level !== zone.threshold_risk) {
        continue;
      }

      // Check if the count threshold has been breached in the last hour
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

      const count = await DataPoint.countDocuments({
        timestamp: { $gte: oneHourAgo },
        risk_level: zone.threshold_risk,
        zone: {
          $geoIntersects: {
            $geometry: newDataPoint.location_geo,
          },
        },
      });

      // If count exceeds threshold, send email
      // We should also add logic to prevent spamming (e.g., only 1 alert per hour)
      if (count > zone.threshold_count) {
        const official = await Official.findById(zone.official);
        if (official) {
          console.log(`!!! ALERT TRIGGERED for zone: ${zone.name} !!!`);
          // This function runs "in the background" (asynchronously)
          sendAlertEmail(official.email, zone.name, zone.threshold_risk, count);
        }
      }
    }
  } catch (error) {
    console.error('Error checking alerts:', error);
  }
};

module.exports = { checkAlerts };