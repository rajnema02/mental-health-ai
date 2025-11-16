const express = require('express');
const router = express.Router();

const adminAuth = require('../middleware/adminMiddleware');  // FIX: import admin auth
const {
  createAlert,
  getAlerts,
  deleteAlert,
} = require('../controller/alertController');

// Protect ALL alert routes
router.use(adminAuth);

router.route('/')
  .post(createAlert)
  .get(getAlerts);

router.route('/:id')
  .delete(deleteAlert);

module.exports = router;
