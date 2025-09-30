const Progress = require("../models/ProgressSchema");
const Course = require("../models/Course");
const User = require("../models/User");

// Initialize progress for a user when they enroll in a course
exports.initializeCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Check if progress already exists
    const existingProgress = await Progress.findOne({ userId, courseId });
    if (existingProgress) {
      return res.status(400).json({ 
        success: false, 
        message: "Progress already initialized for this course" 
      });
    }

    // Get course structure
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: "Course not found" 
      });
    }

    // Initialize progress structure based on course structure
    const unitsProgress = course.units.map(unit => ({
      unitId: unit._id.toString(),
      topicsProgress: unit.topics.map(topic => ({
        topicId: topic._id.toString(),
        subtopicsProgress: topic.subtopics.map(subtopic => ({
          subtopicId: subtopic._id.toString(),
          isCompleted: false,
          timeSpent: 0,
          notes: "",
          bookmarked: false
        })),
        completionPercentage: 0,
        lastAccessedAt: new Date()
      })),
      completionPercentage: 0
    }));

    // Create new progress document
    const progress = new Progress({
      userId,
      courseId,
      unitsProgress,
      overallProgress: 0,
      totalTimeSpent: 0,
      streak: 0,
      enrolledAt: new Date()
    });

    await progress.save();

    // Update user's enrolled courses
    await User.findByIdAndUpdate(userId, {
      $push: { enrolledCourses: { courseId, enrolledAt: new Date() } },
      $inc: { 'stats.totalCoursesEnrolled': 1 }
    });

    res.status(201).json({
      success: true,
      message: "Course progress initialized successfully",
      data: progress
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error initializing progress",
      error: error.message
    });
  }
};

// Get user's progress for a specific course
exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const progress = await Progress.findOne({ userId, courseId })
      .populate('courseId', 'name short_name semester')
      .populate('userId', 'name email profile.currentSemester');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found for this course"
      });
    }

    res.status(200).json({
      success: true,
      data: progress
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching progress",
      error: error.message
    });
  }
};

// Update subtopic completion status
exports.updateSubtopicProgress = async (req, res) => {
  try {
    const { courseId, unitId, topicId, subtopicId } = req.params;
    const { isCompleted, timeSpent, notes } = req.body;
    const userId = req.user.id;

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found"
      });
    }

    // Find and update the specific subtopic
    const unit = progress.unitsProgress.find(u => u.unitId === unitId);
    if (!unit) {
      return res.status(404).json({
        success: false,
        message: "Unit not found"
      });
    }

    const topic = unit.topicsProgress.find(t => t.topicId === topicId);
    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    const subtopic = topic.subtopicsProgress.find(st => st.subtopicId === subtopicId);
    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found"
      });
    }

    // Update subtopic progress
    const wasCompleted = subtopic.isCompleted;
    subtopic.isCompleted = isCompleted;
    if (timeSpent) subtopic.timeSpent += timeSpent;
    if (notes !== undefined) subtopic.notes = notes;
    
    if (isCompleted && !wasCompleted) {
      subtopic.completedAt = new Date();
      // Award experience points
      await User.findByIdAndUpdate(userId, {
        $inc: { 'stats.experiencePoints': 10 }
      });
    }

    // Update last access time
    topic.lastAccessedAt = new Date();
    progress.lastStudiedAt = new Date();

    // Add today to study dates if not already present
    const today = new Date().toDateString();
    const hasStudiedToday = progress.studyDates.some(date => 
      new Date(date).toDateString() === today
    );
    if (!hasStudiedToday) {
      progress.studyDates.push(new Date());
    }

    await progress.save();

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      data: {
        overallProgress: progress.overallProgress,
        unitProgress: unit.completionPercentage,
        topicProgress: topic.completionPercentage
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating progress",
      error: error.message
    });
  }
};

// Get user's overall dashboard data
exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user with populated data
    const user = await User.findById(userId)
      .populate('enrolledCourses.courseId', 'name short_name semester totalTopics');

    // Get progress for all enrolled courses
    const progressData = await Progress.find({ userId })
      .populate('courseId', 'name short_name semester image_link');

    // Calculate dashboard statistics
    const dashboardStats = {
      totalCourses: user.enrolledCourses.length,
      completedCourses: progressData.filter(p => p.overallProgress === 100).length,
      inProgressCourses: progressData.filter(p => p.overallProgress > 0 && p.overallProgress < 100).length,
      averageProgress: progressData.length > 0 
        ? Math.round(progressData.reduce((sum, p) => sum + p.overallProgress, 0) / progressData.length)
        : 0,
      totalStudyTime: progressData.reduce((sum, p) => sum + p.totalTimeSpent, 0),
      currentStreak: user.stats.currentStreak,
      level: user.stats.level,
      experiencePoints: user.stats.experiencePoints
    };

    // Recent activity (last 7 days)
    const recentActivity = progressData
      .filter(p => p.lastStudiedAt && 
        new Date(p.lastStudiedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
      .sort((a, b) => new Date(b.lastStudiedAt) - new Date(a.lastStudiedAt))
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          semester: user.profile.currentSemester,
          branch: user.profile.branch,
          level: user.stats.level,
          experiencePoints: user.stats.experiencePoints
        },
        stats: dashboardStats,
        courses: progressData,
        recentActivity
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};

// Get learning analytics for a user
exports.getLearningAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = '30' } = req.query; // days

    const progress = await Progress.find({ userId })
      .populate('courseId', 'name short_name');

    // Calculate study patterns
    const studyDates = [];
    progress.forEach(p => {
      if (p.studyDates) {
        studyDates.push(...p.studyDates);
      }
    });

    // Group by date and calculate daily study time
    const dailyStats = {};
    const cutoffDate = new Date(Date.now() - parseInt(period) * 24 * 60 * 60 * 1000);

    studyDates
      .filter(date => new Date(date) > cutoffDate)
      .forEach(date => {
        const dateKey = new Date(date).toDateString();
        dailyStats[dateKey] = (dailyStats[dateKey] || 0) + 1;
      });

    // Weekly progress summary
    const weeklyProgress = Object.entries(dailyStats)
      .map(([date, count]) => ({
        date,
        studyTime: count * 30, // estimate 30 minutes per session
        topicsCompleted: count
      }));

    res.status(200).json({
      success: true,
      data: {
        totalStudyDays: Object.keys(dailyStats).length,
        averageDailyStudyTime: weeklyProgress.reduce((sum, day) => sum + day.studyTime, 0) / weeklyProgress.length || 0,
        weeklyProgress,
        courseProgress: progress.map(p => ({
          courseName: p.courseId.name,
          progress: p.overallProgress,
          timeSpent: p.totalTimeSpent,
          lastStudied: p.lastStudiedAt
        }))
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching analytics",
      error: error.message
    });
  }
};

// Toggle bookmark for a subtopic
exports.toggleBookmark = async (req, res) => {
  try {
    const { courseId, unitId, topicId, subtopicId } = req.params;
    const userId = req.user.id;

    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Progress not found"
      });
    }

    // Find the subtopic
    const unit = progress.unitsProgress.find(u => u.unitId === unitId);
    const topic = unit?.topicsProgress.find(t => t.topicId === topicId);
    const subtopic = topic?.subtopicsProgress.find(st => st.subtopicId === subtopicId);

    if (!subtopic) {
      return res.status(404).json({
        success: false,
        message: "Subtopic not found"
      });
    }

    // Toggle bookmark
    subtopic.bookmarked = !subtopic.bookmarked;
    await progress.save();

    // Also update user's bookmarks array
    const user = await User.findById(userId);
    const bookmarkIndex = user.bookmarks.findIndex(b => 
      b.courseId.toString() === courseId && 
      b.subtopicId === subtopicId
    );

    if (subtopic.bookmarked && bookmarkIndex === -1) {
      user.bookmarks.push({
        courseId,
        unitId,
        topicId,
        subtopicId,
        createdAt: new Date()
      });
    } else if (!subtopic.bookmarked && bookmarkIndex !== -1) {
      user.bookmarks.splice(bookmarkIndex, 1);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: `Subtopic ${subtopic.bookmarked ? 'bookmarked' : 'unbookmarked'} successfully`,
      data: { bookmarked: subtopic.bookmarked }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling bookmark",
      error: error.message
    });
  }
};

module.exports = {
  initializeCourseProgress: exports.initializeCourseProgress,
  getCourseProgress: exports.getCourseProgress,
  updateSubtopicProgress: exports.updateSubtopicProgress,
  getUserDashboard: exports.getUserDashboard,
  getLearningAnalytics: exports.getLearningAnalytics,
  toggleBookmark: exports.toggleBookmark
};