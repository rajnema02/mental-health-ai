// backend/src/api/controller/alertController.js
import AlertZone from "../models/AlertZone.js";

// CREATE ALERT
export const createAlert = async (req, res) => {
  try {
    if (!req.official) {
      return res.status(401).json({ message: "Unauthorized: No admin found" });
    }

    const { name, zone } = req.body;

    // Validate zone
    if (!zone || !zone.type || !zone.coordinates) {
      return res.status(400).json({
        message: "Invalid zone: Must include type & coordinates",
      });
    }

    const alert = await AlertZone.create({
      name,
      zone,
      official: req.official._id,
    });

    res.status(201).json(alert);

  } catch (err) {
    console.error("CREATE ALERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL ALERTS for logged-in admin
export const getAlerts = async (req, res) => {
  try {
    if (!req.official) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const alerts = await AlertZone.find({ official: req.official._id });

    res.json(alerts);

  } catch (err) {
    console.error("GET ALERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE ALERT
export const deleteAlert = async (req, res) => {
  try {
    if (!req.official) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const alert = await AlertZone.findById(req.params.id);

    if (!alert) return res.status(404).json({ message: "Alert not found" });

    if (alert.official.toString() !== req.official._id.toString()) {
      return res.status(401).json({ message: "Unauthorized: Not your alert" });
    }

    await alert.deleteOne();

    res.json({ message: "Alert deleted successfully" });

  } catch (err) {
    console.error("DELETE ALERT ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
