const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const {
  initializeCourseProgress,
  getCourseProgress,
  updateSubtopicProgress,
  getUserDashboard,
  getLearningAnalytics,
  toggleBookmark
} = require("../controllers/progressController");

// All routes require authentication
router.use(authenticate);

// Initialize progress when user enrolls in a course
router.post("/initialize", initializeCourseProgress);

// Get user's dashboard data
router.get("/dashboard", getUserDashboard);

// Get learning analytics
router.get("/analytics", getLearningAnalytics);

// Get progress for a specific course
router.get("/course/:courseId", getCourseProgress);

// Update subtopic progress
router.put("/course/:courseId/unit/:unitId/topic/:topicId/subtopic/:subtopicId", updateSubtopicProgress);

// Toggle bookmark for a subtopic
router.post("/course/:courseId/unit/:unitId/topic/:topicId/subtopic/:subtopicId/bookmark", toggleBookmark);

module.exports = router;
