import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaBookOpen, 
  FaTrophy, 
  FaFire, 
  FaClock,
  FaCalendarAlt,
  FaChartLine,
  FaBookmark,
  FaPlay,
  FaCheck,
  FaStar,
  FaArrowRight,
  FaGraduationCap,
  FaBullseye
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const StudentDashboard = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3000/api/progress/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressColor = (progress) => {
    if (progress < 30) return "from-red-400 to-red-600";
    if (progress < 70) return "from-yellow-400 to-yellow-600";
    return "from-green-400 to-green-600";
  };

  const getLevelProgress = (xp) => {
    const currentLevelXP = xp % 1000;
    const nextLevelXP = 1000;
    return (currentLevelXP / nextLevelXP) * 100;
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: currentTheme.gradient }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-xl mt-4" style={{ color: currentTheme.text }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{ background: currentTheme.gradient }}
    >
      {/* Navigation */}
      <div className="fixed top-0 w-full z-50">
        <NavBar />
      </div>

      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-2" style={{ color: currentTheme.text }}>
              {getGreeting()}, {dashboardData?.user?.name || "Student"} 👋
            </h1>
            <p className="text-xl" style={{ color: currentTheme.textSecondary }}>
              Ready to continue your learning journey?
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Total Courses */}
            <div 
              className="p-6 rounded-xl border"
              style={{ 
                backgroundColor: currentTheme.card,
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                    Total Courses
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: currentTheme.text }}>
                    {dashboardData?.stats?.totalCourses || 0}
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg">
                  <FaBookOpen className="text-white text-xl" />
                </div>
              </div>
            </div>

            {/* Average Progress */}
            <div 
              className="p-6 rounded-xl border"
              style={{ 
                backgroundColor: currentTheme.card,
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                    Avg Progress
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: currentTheme.text }}>
                    {dashboardData?.stats?.averageProgress || 0}%
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-400 to-green-600 rounded-lg">
                  <FaChartLine className="text-white text-xl" />
                </div>
              </div>
            </div>

            {/* Study Streak */}
            <div 
              className="p-6 rounded-xl border"
              style={{ 
                backgroundColor: currentTheme.card,
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                    Study Streak
                  </p>
                  <p className="text-3xl font-bold mt-1" style={{ color: currentTheme.text }}>
                    {dashboardData?.stats?.currentStreak || 0} days
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg">
                  <FaFire className="text-white text-xl" />
                </div>
              </div>
            </div>

            {/* Level & XP */}
            <div 
              className="p-6 rounded-xl border"
              style={{ 
                backgroundColor: currentTheme.card,
                borderColor: isDarkMode ? '#374151' : '#e5e7eb'
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-medium" style={{ color: currentTheme.textSecondary }}>
                    Level {dashboardData?.stats?.level || 1}
                  </p>
                  <p className="text-lg font-bold" style={{ color: currentTheme.text }}>
                    {dashboardData?.stats?.experiencePoints || 0} XP
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg">
                  <FaTrophy className="text-white text-xl" />
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getLevelProgress(dashboardData?.stats?.experiencePoints || 0)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Continue Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold" style={{ color: currentTheme.text }}>
                    Continue Learning
                  </h2>
                  <Link 
                    to="/subjects"
                    className="text-rose-500 hover:text-rose-600 flex items-center gap-2"
                  >
                    View All <FaArrowRight />
                  </Link>
                </div>

                <div className="space-y-4">
                  {dashboardData?.courses?.filter(course => course.overallProgress > 0 && course.overallProgress < 100)
                    .slice(0, 3)
                    .map((course, index) => (
                    <div 
                      key={course.courseId._id}
                      className="p-4 rounded-xl border hover:shadow-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: currentTheme.card,
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <FaBookOpen className="text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold" style={{ color: currentTheme.text }}>
                              {course.courseId.name}
                            </h3>
                            <div className="flex items-center gap-3 text-sm" style={{ color: currentTheme.textSecondary }}>
                              <span>Semester {course.courseId.semester}</span>
                              <span>•</span>
                              <span>{course.overallProgress}% complete</span>
                            </div>
                          </div>
                        </div>
                        
                        <Link to={`/subject/${course.courseId._id}`}>
                          <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                            Continue
                          </button>
                        </Link>
                      </div>
                      
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${getProgressColor(course.overallProgress)} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${course.overallProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(!dashboardData?.courses || dashboardData.courses.filter(c => c.overallProgress > 0 && c.overallProgress < 100).length === 0) && (
                    <div 
                      className="p-8 rounded-xl border text-center"
                      style={{ 
                        backgroundColor: currentTheme.card,
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <FaBookOpen className="text-4xl mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
                      <h3 className="text-lg font-semibold mb-2" style={{ color: currentTheme.text }}>
                        No courses in progress
                      </h3>
                      <p className="mb-4" style={{ color: currentTheme.textSecondary }}>
                        Start learning by enrolling in a subject
                      </p>
                      <Link to="/subjects">
                        <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-2 rounded-lg">
                          Browse Subjects
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: currentTheme.text }}>
                  Recent Activity
                </h2>

                <div className="space-y-3">
                  {dashboardData?.recentActivity?.map((activity, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border flex items-center gap-4"
                      style={{ 
                        backgroundColor: currentTheme.card,
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FaCheck className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium" style={{ color: currentTheme.text }}>
                          Studied {activity.courseId.name}
                        </p>
                        <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                          {new Date(activity.lastStudiedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-green-500">
                        {activity.overallProgress}%
                      </div>
                    </div>
                  ))}

                  {(!dashboardData?.recentActivity || dashboardData.recentActivity.length === 0) && (
                    <div 
                      className="p-6 rounded-lg border text-center"
                      style={{ 
                        backgroundColor: currentTheme.card,
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                      }}
                    >
                      <FaClock className="text-3xl mx-auto mb-3" style={{ color: currentTheme.textSecondary }} />
                      <p style={{ color: currentTheme.textSecondary }}>No recent activity</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Study Goals */}
              <motion.div
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: currentTheme.card,
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: currentTheme.text }}>
                  Today's Goal
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: currentTheme.textSecondary }}>Study Time</span>
                      <span style={{ color: currentTheme.text }}>
                        {formatTime(dashboardData?.stats?.totalStudyTime || 0)} / 60m
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full"
                        style={{ width: `${Math.min(((dashboardData?.stats?.totalStudyTime || 0) / 60) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: currentTheme.card,
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: currentTheme.text }}>
                  Quick Actions
                </h3>
                
                <div className="space-y-3">
                  <Link to="/subjects">
                    <button className="w-full p-3 text-left rounded-lg border hover:bg-opacity-50 transition-all duration-200 flex items-center gap-3">
                      <FaBookOpen className="text-blue-500" />
                      <span style={{ color: currentTheme.text }}>Browse Subjects</span>
                    </button>
                  </Link>
                  
                  <Link to="/profile">
                    <button className="w-full p-3 text-left rounded-lg border hover:bg-opacity-50 transition-all duration-200 flex items-center gap-3">
                      <FaGraduationCap className="text-green-500" />
                      <span style={{ color: currentTheme.text }}>View Profile</span>
                    </button>
                  </Link>
                  
                  <button className="w-full p-3 text-left rounded-lg border hover:bg-opacity-50 transition-all duration-200 flex items-center gap-3">
                    <FaBullseye className="text-purple-500" />
                    <span style={{ color: currentTheme.text }}>Set Goals</span>
                  </button>
                </div>
              </motion.div>

              {/* Achievements Preview */}
              <motion.div
                className="p-6 rounded-xl border"
                style={{ 
                  backgroundColor: currentTheme.card,
                  borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-bold mb-4" style={{ color: currentTheme.text }}>
                  Achievements
                </h3>
                
                <div className="text-center py-4">
                  <FaTrophy className="text-4xl text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                    Start learning to earn your first badge!
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;