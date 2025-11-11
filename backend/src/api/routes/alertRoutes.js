const express = require('express');
const router = express.Router();
const {
  createAlert,
  getAlerts,
  deleteAlert,
} = require('../controller/alertController');

router.route('/').post(createAlert).get(getAlerts);
router.route('/:id').delete(deleteAlert);

module.exports = router;