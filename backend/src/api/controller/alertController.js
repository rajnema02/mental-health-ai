const AlertZone = require('../models/AlertZone');

// @desc    Create new alert
exports.createAlert = async (req, res) => {
  const { name, zone } = req.body;

  try {
    const alert = new AlertZone({
      name,
      zone,
      official: req.official._id,
    });

    const createdAlert = await alert.save();
    res.status(201).json(createdAlert);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await AlertZone.find({ official: req.official._id });
    res.json(alerts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete an alert
exports.deleteAlert = async (req, res) => {
  try {
    const alert = await AlertZone.findById(req.params.id);

    if (alert) {
      // Check if alert belongs to this official
      if (alert.official.toString() !== req.official._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      
      await alert.deleteOne(); // Use deleteOne()
      res.json({ message: 'Alert removed' });
    } else {
      res.status(404).json({ message: 'Alert not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};