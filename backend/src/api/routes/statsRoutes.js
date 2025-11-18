// src/api/routes/statsRoutes.js
import express from 'express';
import adminAuth from '../middleware/adminMiddleware.js';
import { getInitialLoad, getDashboardStats } from '../controller/statsController.js';

const router = express.Router();

// both protected by admin token
router.get('/initial-load', adminAuth, getInitialLoad);
router.get('/dashboard', adminAuth, getDashboardStats);

export default router;