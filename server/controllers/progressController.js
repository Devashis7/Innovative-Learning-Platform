const Progress = require("../models/ProgressSchema");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// Get dashboard data for a student
exports.getDashboard = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Get all courses
    const courses = await Course.find();
    
    // Get user's progress for each course using the nested ProgressSchema
    const coursesWithProgress = await Promise.all(
      courses.map(async (course) => {
        const totalSubtopics = course.units.reduce(
          (acc, unit) =>
            acc + unit.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0),
          0
        );

        // Get progress document for this user and course
        const userProgress = await Progress.findOne({
          userId,
          courseId: course._id,
        });

        let progress = 0;
        let completedSubtopics = 0;

        if (userProgress && userProgress.unitsProgress) {
          // Calculate progress from nested structure
          userProgress.unitsProgress.forEach(unit => {
            unit.topicsProgress?.forEach(topic => {
              topic.subtopicsProgress?.forEach(subtopic => {
                if (subtopic.isCompleted) {
                  completedSubtopics++;
                }
              });
            });
          });
          
          progress = totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0;
        }

        return {
          courseId: course,
          overallProgress: progress,
          totalSubtopics,
          completedSubtopics: await Progress.countDocuments({
            userId,
            courseId: course._id,
            completed: true,
          })
        };
      })
    );

    // Filter to show only courses with progress > 0, or show all (depending on preference)
    // For now, let's show all courses
    const data = {
      courses: coursesWithProgress,
      totalCourses: courses.length,
      coursesInProgress: coursesWithProgress.filter(c => c.overallProgress > 0).length
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark a subtopic as complete or incomplete
exports.markProgress = async (req, res) => {
  const { courseId, subtopicId, completed } = req.body;
  const userId = req.user.userId;

  console.log("📝 markProgress called with:", { userId, courseId, subtopicId, completed });

  try {
    // Validate ObjectIds
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, error: "Invalid userId" });
    }
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, error: "Invalid courseId" });
    }
    if (!mongoose.Types.ObjectId.isValid(subtopicId)) {
      return res.status(400).json({ success: false, error: "Invalid subtopicId" });
    }

    console.log("✅ All ObjectIds are valid");

    // Get the course to find unit and topic structure
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    // Find which unit and topic the subtopic belongs to
    let unitId = null;
    let topicId = null;
    
    course.units.forEach(unit => {
      unit.topics.forEach(topic => {
        topic.subtopics.forEach(subtopic => {
          if (subtopic._id.toString() === subtopicId) {
            unitId = unit._id.toString();
            topicId = topic._id.toString();
          }
        });
      });
    });

    if (!unitId || !topicId) {
      return res.status(400).json({ success: false, error: "Subtopic not found in course structure" });
    }

    console.log("📍 Found subtopic in unit:", unitId, "topic:", topicId);

    // Find or create progress record for this user and course
    let progress = await Progress.findOne({ userId, courseId });
    
    if (!progress) {
      // Create new progress record with nested structure
      progress = new Progress({
        userId,
        courseId,
        unitsProgress: []
      });
    }

    // Find or create unit progress
    let unitProgress = progress.unitsProgress.find(u => u.unitId === unitId);
    if (!unitProgress) {
      unitProgress = {
        unitId,
        topicsProgress: []
      };
      progress.unitsProgress.push(unitProgress);
    }

    // Find or create topic progress
    let topicProgress = unitProgress.topicsProgress.find(t => t.topicId === topicId);
    if (!topicProgress) {
      topicProgress = {
        topicId,
        subtopicsProgress: []
      };
      unitProgress.topicsProgress.push(topicProgress);
    }

    // Find or create subtopic progress
    let subtopicProgress = topicProgress.subtopicsProgress.find(s => s.subtopicId === subtopicId);
    if (!subtopicProgress) {
      subtopicProgress = {
        subtopicId,
        isCompleted: false
      };
      topicProgress.subtopicsProgress.push(subtopicProgress);
    }

    // Update completion status
    subtopicProgress.isCompleted = completed;
    if (completed) {
      subtopicProgress.completedAt = new Date();
    } else {
      subtopicProgress.completedAt = null;
    }

    // Save progress (this will trigger pre-save middleware to calculate percentages)
    await progress.save();
    
    console.log("✅ Progress updated successfully");
    console.log("📊 Updated progress percentages:", {
      overallProgress: progress.overallProgress,
      unitProgress: unitProgress.completionPercentage,
      topicProgress: topicProgress.completionPercentage
    });
    
    // Return the full updated progress data so frontend can update immediately
    const progressData = {
      courseId,
      unitsProgress: progress.unitsProgress,
      overallProgress: progress.overallProgress,
      subtopicUpdated: subtopicProgress
    };
    
    res.status(200).json({ success: true, data: progressData });
  } catch (error) {
    console.error("❌ markProgress error:", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get the progress for a course
exports.getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.userId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    // Get progress record for this user and course (single document with nested structure)
    let userProgress = await Progress.findOne({
      userId,
      courseId,
    });

    // If no progress exists, create and save initial progress structure
    if (!userProgress) {
      console.log("📝 Creating initial progress structure for new subject");
      
      // Build initial empty progress structure based on course structure
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
      userProgress = new Progress({
        userId,
        courseId,
        unitsProgress: initialUnitsProgress,
        overallProgress: 0,
        totalTimeSpent: 0,
        streak: 0,
        enrolledAt: new Date(),
        lastStudiedAt: new Date()
      });

      // Save initial progress
      await userProgress.save();
      console.log("✅ Initial progress structure created and saved");
    }

    // If progress exists, return it directly (it already has the correct structure)
    if (userProgress && userProgress.unitsProgress && userProgress.unitsProgress.length > 0) {
      console.log("📊 Returning existing progress data");
      const progressData = {
        courseId,
        unitsProgress: userProgress.unitsProgress,
        overallProgress: userProgress.overallProgress || 0,
        totalSubtopics: userProgress.totalSubtopics || 0,
        completedSubtopics: userProgress.completedSubtopics || 0,
        totalTimeSpent: userProgress.totalTimeSpent || 0,
        streak: userProgress.streak || 0
      };
      
      return res.status(200).json({ success: true, data: progressData });
    }

    console.log("📝 Creating empty progress structure for course");

    // If no progress exists, build empty structure
    const unitsProgress = course.units.map(unit => ({
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
        completionPercentage: 0
      })),
      completionPercentage: 0
    }));

    const totalSubtopics = course.units.reduce(
      (acc, unit) => acc + unit.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0),
      0
    );

    const progressData = {
      courseId,
      unitsProgress,
      overallProgress: 0,
      totalSubtopics,
      completedSubtopics: 0,
      totalTimeSpent: 0,
      streak: 0
    };

    res.status(200).json({ success: true, data: progressData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
