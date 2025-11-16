const AlertZone = require('../models/AlertZone');

exports.createAlert = async (req, res) => {
  if (!req.official) {
    return res.status(401).json({ message: 'Unauthorized: No admin found' });
  }

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
    console.error("CREATE ALERT ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlerts = async (req, res) => {
  if (!req.official) {
    return res.status(401).json({ message: 'Unauthorized: No admin found' });
  }

  try {
    const alerts = await AlertZone.find({ official: req.official._id });
    res.json(alerts);
  } catch (error) {
    console.error("GET ALERT ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteAlert = async (req, res) => {
  if (!req.official) {
    return res.status(401).json({ message: 'Unauthorized: No admin found' });
  }

  try {
    const alert = await AlertZone.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    if (alert.official.toString() !== req.official._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await alert.deleteOne();
    res.json({ message: 'Alert removed' });

  } catch (error) {
    console.error("DELETE ALERT ERROR:", error);
    res.status(500).json({ message: 'Server error' });
  }
};
