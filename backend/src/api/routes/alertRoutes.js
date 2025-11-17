// backend/src/api/routes/alertRoutes.js
import express from "express";
import adminAuth from "../middleware/adminMiddleware.js";
import {
  createAlert,
  getAlerts,
  deleteAlert,
} from "../controller/alertController.js";

const router = express.Router();

// Protect all routes
router.use(adminAuth);

router.route("/")
  .get(getAlerts)
  .post(createAlert);

router.route("/:id")
  .delete(deleteAlert);

export default router;