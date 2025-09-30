import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaArrowLeft, 
  FaPlay, 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaGraduationCap,
  FaCheck,
  FaBookmark,
  FaShare,
  FaDownload,
  FaChevronRight
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const CourseDetail = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${id}`);
        setCourse(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        // Create a mock course if API fails
        const mockCourse = {
          _id: id,
          title: "Sample Course",
          description: "This is a sample course description",
          category: "Programming",
          level: "Intermediate",
          duration: "8 weeks",
          students: 1250,
          rating: 4.8,
          price: 99,
          instructor: "John Doe",
          thumbnail: "/course-sample.jpg",
          modules: [
            {
              title: "Introduction",
              lessons: [
                { title: "Course Overview", duration: "10 min", completed: false },
                { title: "Getting Started", duration: "15 min", completed: false }
              ]
            },
            {
              title: "Fundamentals",
              lessons: [
                { title: "Basic Concepts", duration: "20 min", completed: false },
                { title: "Practice Exercises", duration: "30 min", completed: false }
              ]
            }
          ],
          requirements: [
            "Basic programming knowledge",
            "Access to a computer",
            "Willingness to learn"
          ],
          whatYouLearn: [
            "Master the fundamentals",
            "Build real-world projects",
            "Gain practical experience",
            "Prepare for job interviews"
          ]
        };
        setCourse(mockCourse);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center transition-colors duration-300"
        style={{ background: currentTheme.gradient }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-xl mt-4" style={{ color: currentTheme.text }}>Loading course...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div 
        className="min-h-screen transition-colors duration-300"
        style={{ background: currentTheme.gradient }}
      >
        <div className="fixed top-0 w-full z-50">
          <NavBar />
        </div>
        <div className="pt-32 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <FaGraduationCap className="text-6xl mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
            <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.text }}>Course Not Found</h2>
            <p className="mb-6" style={{ color: currentTheme.textSecondary }}>The course you're looking for doesn't exist.</p>
            <Link to="/courses">
              <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300">
                Browse Courses
              </button>
            </Link>
          </div>
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

      {/* Course Header */}
      <motion.section 
        className="pt-32 pb-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6" style={{ color: currentTheme.textSecondary }}>
            <Link to="/courses" className="hover:text-rose-500 transition-colors">
              Courses
            </Link>
            <FaChevronRight className="text-sm" />
            <span style={{ color: currentTheme.text }}>{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: currentTheme.text }}>
                  {course.title}
                </h1>
                <p className="text-xl mb-6 leading-relaxed" style={{ color: currentTheme.textSecondary }}>
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span className="text-white font-semibold">{course.rating}</span>
                    <span className="text-gray-400">({course.students} students)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    <span className="text-gray-300">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaGraduationCap className="text-green-500" />
                    <span className="text-gray-300">{course.level}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {course.instructor?.charAt(0) || "I"}
                  </div>
                  <div>
                    <p className="text-gray-400">Instructor</p>
                    <p className="text-white font-semibold">{course.instructor || "Expert Instructor"}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Card */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-[#1f2937] p-6 rounded-xl border border-gray-700 sticky top-24"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
                  <FaPlay className="text-4xl text-rose-500" />
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-white mb-2">
                    ${course.price}
                  </div>
                  <p className="text-gray-400">One-time payment</p>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300">
                    Enroll Now
                  </button>
                  <button className="w-full border-2 border-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-600/20 transition-all duration-300">
                    Add to Wishlist
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Students:</span>
                    <span className="text-white">{course.students}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Level:</span>
                    <span className="text-white">{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Certificate:</span>
                    <span className="text-white">Yes</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Course Content Tabs */}
      <motion.section 
        className="py-8 px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-700">
            {["overview", "curriculum", "requirements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-rose-500 border-b-2 border-rose-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {course.whatYouLearn?.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "curriculum" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Course Curriculum</h3>
                  <div className="space-y-4">
                    {course.modules?.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="bg-[#1f2937] rounded-lg border border-gray-700">
                        <div className="p-4 border-b border-gray-700">
                          <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                        </div>
                        <div className="p-4 space-y-3">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-3">
                                <FaPlay className="text-rose-500 text-sm" />
                                <span className="text-gray-300">{lesson.title}</span>
                              </div>
                              <span className="text-gray-400 text-sm">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "requirements" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Requirements</h3>
                  <div className="space-y-3">
                    {course.requirements?.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <FaCheck className="text-rose-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CourseDetail;
