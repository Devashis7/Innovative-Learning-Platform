const express = require('express');
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  createCourses,
} = require('../controllers/courseController');
const { authenticate, isAdmin } = require('../middleware/auth');

const router = express.Router();

// Admin-only routes for creating, updating, and deleting courses
router.post('/', authenticate, isAdmin, createCourse);
router.post('/bulk', authenticate, isAdmin, createCourses);
router.put('/:id', authenticate, isAdmin, updateCourse);
router.delete('/:id', authenticate, isAdmin, deleteCourse);

// Public routes for all users to view courses
router.get('/', getCourses);
router.get('/:id', getCourse);

module.exports = router;
