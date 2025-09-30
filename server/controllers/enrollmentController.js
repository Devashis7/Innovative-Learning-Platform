const Progress = require("../models/ProgressSchema");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Enroll a user in a course (create initial progress structure)
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.userId;

  try {
    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, error: "Invalid courseId" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    // Check if user is already enrolled
    const existingProgress = await Progress.findOne({ userId, courseId });
    if (existingProgress) {
      return res.status(200).json({ 
        success: true, 
        message: "Already enrolled in this course",
        data: existingProgress 
      });
    }

    // Create initial progress structure
    const initialUnitsProgress = course.units.map(unit => ({
      unitId: unit._id.toString(),
      topicsProgress: unit.topics.map(topic => ({
        topicId: topic._id.toString(),
        subtopicsProgress: topic.subtopics.map(subtopic => ({
          subtopicId: subtopic._id.toString(),
          isCompleted: false,
          bookmarked: false,
          notes: "",
          timeSpent: 0
        })),
        completionPercentage: 0,
        lastAccessedAt: new Date()
      })),
      completionPercentage: 0,
      startedAt: new Date()
    }));

    // Create new progress document
    const newProgress = new Progress({
      userId,
      courseId,
      unitsProgress: initialUnitsProgress,
      overallProgress: 0,
      totalTimeSpent: 0,
      streak: 0,
      enrolledAt: new Date(),
      lastStudiedAt: new Date()
    });

    await newProgress.save();

    res.status(201).json({
      success: true,
      message: "Successfully enrolled in course",
      data: newProgress
    });

  } catch (error) {
    console.error("❌ Enrollment error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get user's enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  const userId = req.user.userId;

  try {
    const enrolledCourses = await Progress.find({ userId })
      .populate('courseId')
      .select('courseId overallProgress enrolledAt lastStudiedAt');

    res.status(200).json({
      success: true,
      data: enrolledCourses
    });

  } catch (error) {
    console.error("❌ Error fetching enrolled courses:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};