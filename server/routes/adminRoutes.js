const express = require('express');
const {
  getDashboardStats,
  getRecentActivity,
  getUserStats,
  getCourseStats
} = require('../controllers/adminController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin privileges
router.use(authenticate);
router.use(isAdmin);

// Dashboard statistics
router.get('/dashboard/stats', getDashboardStats);

// Recent activity
router.get('/dashboard/activity', getRecentActivity);

// User statistics
router.get('/users/stats', getUserStats);

// Course statistics  
router.get('/courses/stats', getCourseStats);

module.exports = router;
