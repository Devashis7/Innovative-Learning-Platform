const express = require("express");
const { authenticate, isAdmin } = require("../middleware/auth");
const User = require("../models/User");
const Course = require("../models/Course");

const router = express.Router();

// Get all students (admin only)
router.get("/students", authenticate, isAdmin, async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json({ students });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
});

// Delete a student (admin only)
router.delete("/student/:id", authenticate, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔥 Submit all courses (admin only)
router.post("/add-course", authenticate, isAdmin, async (req, res) => {
  try {
    const { courses } = req.body;

    if (!courses || !Array.isArray(courses)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    // Save all courses to DB (bulk insert)
    await Course.insertMany(courses);

    res.status(201).json({ message: "Courses saved successfully" });
  } catch (err) {
    console.error("Error saving courses:", err);
    res.status(500).json({ message: "Server error while saving courses" });
  }
});

module.exports = router;
