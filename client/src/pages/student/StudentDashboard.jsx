import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowRight, FaTrophy, FaClock, FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import { AuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/progress/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledCourses(response.data.data?.courses || []);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className={`${currentTheme.background.primary} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className={`${currentTheme.text.primary} text-xl mt-4`}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.background.primary} min-h-screen transition-colors duration-300`}>
      <NavBar />
      <motion.div 
        className="pt-20 px-4 pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-2 ${currentTheme.text.primary}`}>
              {getGreeting()}, {user?.name || "Student"} 👋
            </h1>
            <p className={`text-xl ${currentTheme.text.secondary}`}>
              Ready to continue your learning journey?
            </p>
          </motion.div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${currentTheme.text.primary}`}>My Subjects</h2>
              <Link to="/subjects" className="text-rose-500 hover:text-rose-600 flex items-center gap-2">
                Explore Subjects <FaArrowRight />
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    className={`${currentTheme.background.card} rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden hover:shadow-xl transition-all duration-300 group`}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Course Header */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg text-white">
                            <FaBookOpen />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              {course.courseId?.short_name || course.courseId?.name || course.title}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <span>Sem {course.courseId?.semester || 'N/A'}</span>
                              <span>•</span>
                              <span>{course.courseId?.category || 'Core'}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Circular Progress Indicator */}
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-14 rounded-full border-4 border-gray-200 dark:border-gray-700 relative">
                            <div 
                              className="absolute inset-0 rounded-full"
                              style={{
                                background: `conic-gradient(${
                                  (course.overallProgress || 0) === 0 ? '#e5e7eb' :
                                  (course.overallProgress || 0) < 30 ? '#ef4444' :
                                  (course.overallProgress || 0) < 70 ? '#f59e0b' : '#10b981'
                                } ${(course.overallProgress || 0) * 3.6}deg, #e5e7eb 0deg)`
                              }}
                            ></div>
                            <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                                {course.overallProgress || 0}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {course.courseId?.name || course.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {course.courseId?.description || course.description}
                      </p>

                      {/* Course Stats */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <FaBookOpen />
                          <span>{course.courseId?.units?.length || 0} Units</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock />
                          <span>{course.totalSubtopics || 0} Topics</span>
                        </div>
                        {course.courseId?.credits && (
                          <div className="flex items-center gap-1">
                            <FaTrophy />
                            <span>{course.courseId.credits} Credits</span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link 
                          to={`/subject/${course.courseId?._id || course._id}`}
                          className="flex-1"
                        >
                          <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                            <FaArrowRight />
                            {(course.overallProgress || 0) > 0 ? 'Continue Learning' : 'Start Learning'}
                          </button>
                        </Link>
                        
                        {(course.overallProgress || 0) > 0 && (
                          <button className="px-3 py-3 border border-rose-500 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300">
                            <FaFire />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className={`p-12 rounded-xl border-2 border-dashed ${isDarkMode ? 'border-gray-600' : 'border-gray-300'} text-center ${currentTheme.background.card}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBookOpen className="text-3xl text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${currentTheme.text.primary}`}>Ready to start learning? 🚀</h3>
                <p className={`mb-6 ${currentTheme.text.secondary} max-w-md mx-auto`}>
                  Dive into our comprehensive B.Tech CSE curriculum and start building your programming expertise today.
                </p>
                <Link to="/subjects">
                  <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2 mx-auto">
                    <FaArrowRight />
                    Explore Subjects
                  </button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentDashboard;
