const express = require("express");
const {
  markProgress,
  getCourseProgress,
  getDashboard,
} = require("../controllers/progressController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Student-only routes for managing progress
router.get("/dashboard", authenticate, getDashboard);
router.post("/mark", authenticate, markProgress);
router.get("/course/:courseId", authenticate, getCourseProgress);

// Enrollment routes
const { enrollInCourse, getEnrolledCourses } = require("../controllers/enrollmentController");
router.post("/enroll", authenticate, enrollInCourse);
router.get("/enrolled", authenticate, getEnrolledCourses);

module.exports = router;
