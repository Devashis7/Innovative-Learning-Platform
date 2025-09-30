const express = require("express");
const {
  markProgress,
  getCourseProgress,
} = require("../controllers/progressController");
const { authenticate } = require("../middleware/auth");

const router = express.Router();

// Student-only routes for managing progress
router.post("/mark", authenticate, markProgress);
router.get("/course/:courseId", authenticate, getCourseProgress);

module.exports = router;
