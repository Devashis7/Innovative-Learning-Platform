const Course = require('../models/Course');
const User = require('../models/User');
const Progress = require('../models/ProgressSchema');

// Get admin dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total courses count
    const totalCourses = await Course.countDocuments({ isActive: true });
    
    // Get total users count (excluding admins)
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    
    // Get total admin count
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    
    // Get users who have made progress (active users)
    const activeUserIds = await Progress.distinct('userId');
    const activeUsers = activeUserIds.length;
    
    // Get total enrollments
    const totalEnrollments = await Progress.countDocuments();
    
    // Get completion statistics - count completed subtopics from nested structure
    const allProgress = await Progress.find();
    let completedSubtopics = 0;
    
    allProgress.forEach(progress => {
      if (progress.unitsProgress && Array.isArray(progress.unitsProgress)) {
        progress.unitsProgress.forEach(unit => {
          if (unit.topicsProgress && Array.isArray(unit.topicsProgress)) {
            unit.topicsProgress.forEach(topic => {
              if (topic.subtopicsProgress && Array.isArray(topic.subtopicsProgress)) {
                topic.subtopicsProgress.forEach(subtopic => {
                  if (subtopic.isCompleted) {
                    completedSubtopics++;
                  }
                });
              }
            });
          }
        });
      }
    });
    
    // Get recent enrollments (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentEnrollments = await Progress.countDocuments({
      enrolledAt: { $gte: weekAgo }
    });
    
    // Calculate average completion rate
    const avgCompletionRate = totalEnrollments > 0 ? (completedSubtopics / totalEnrollments) : 0;
    
    res.status(200).json({
      success: true,
      data: {
        totalCourses,
        totalUsers,
        totalAdmins,
        activeUsers,
        totalEnrollments,
        completedSubtopics,
        recentEnrollments,
        avgCompletionRate: Math.round(avgCompletionRate * 100) / 100
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch dashboard statistics'
    });
  }
};

// Get recent activity for admin dashboard
exports.getRecentActivity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Get recent user registrations
    const recentUsers = await User.find({ role: { $ne: 'admin' } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email createdAt');
    
    // Get recent enrollments with user and course details
    const recentEnrollments = await Progress.find()
      .populate('userId', 'name email')
      .populate('courseId', 'name short_name')
      .sort({ enrolledAt: -1 })
      .limit(5);
    
    // Get recent course additions
    const recentCourses = await Course.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('name short_name createdAt');
    
    // Combine and format activities
    const activities = [];
    
    // Add user registrations
    recentUsers.forEach(user => {
      activities.push({
        type: 'user_registration',
        message: `New user '${user.name}' registered`,
        user: user.name,
        timestamp: user.createdAt,
        icon: 'user'
      });
    });
    
    // Add enrollments
    recentEnrollments.forEach(enrollment => {
      if (enrollment.userId && enrollment.courseId) {
        activities.push({
          type: 'enrollment',
          message: `${enrollment.userId.name} enrolled in '${enrollment.courseId.name}'`,
          user: enrollment.userId.name,
          course: enrollment.courseId.name,
          timestamp: enrollment.enrolledAt,
          icon: 'book'
        });
      }
    });
    
    // Add course additions
    recentCourses.forEach(course => {
      activities.push({
        type: 'course_added',
        message: `New course '${course.name}' was added`,
        course: course.name,
        timestamp: course.createdAt,
        icon: 'plus'
      });
    });
    
    // Sort all activities by timestamp and limit
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const limitedActivities = activities.slice(0, limit);
    
    res.status(200).json({
      success: true,
      data: limitedActivities
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch recent activity'
    });
  }
};

// Get user statistics
exports.getUserStats = async (req, res) => {
  try {
    // Get user distribution by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get users by registration date (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);
    
    // Get most active users (by completed subtopics)
    const activeUsers = await Progress.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          userName: '$user.name',
          userEmail: '$user.email',
          completedCount: { $size: '$completedSubtopics' },
          enrolledAt: 1
        }
      },
      {
        $sort: { completedCount: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        usersByRole,
        userGrowth,
        activeUsers
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user statistics'
    });
  }
};

// Get course statistics
exports.getCourseStats = async (req, res) => {
  try {
    // Get courses with enrollment counts
    const courseStats = await Course.aggregate([
      {
        $lookup: {
          from: 'progresses',
          localField: '_id',
          foreignField: 'courseId',
          as: 'enrollments'
        }
      },
      {
        $project: {
          name: 1,
          short_name: 1,
          category: 1,
          semester: 1,
          credits: 1,
          isActive: 1,
          createdAt: 1,
          enrollmentCount: { $size: '$enrollments' },
          avgProgress: {
            $avg: {
              $map: {
                input: '$enrollments',
                as: 'enrollment',
                in: { $size: '$$enrollment.completedSubtopics' }
              }
            }
          }
        }
      },
      {
        $sort: { enrollmentCount: -1 }
      }
    ]);
    
    // Get category distribution
    const categoryStats = await Course.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalEnrollments: {
            $sum: {
              $size: {
                $ifNull: ['$enrollments', []]
              }
            }
          }
        }
      }
    ]);
    
    // Get semester distribution
    const semesterStats = await Course.aggregate([
      {
        $group: {
          _id: '$semester',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id': 1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      data: {
        courseStats,
        categoryStats,
        semesterStats
      }
    });
  } catch (error) {
    console.error('Error fetching course stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch course statistics'
    });
  }
};