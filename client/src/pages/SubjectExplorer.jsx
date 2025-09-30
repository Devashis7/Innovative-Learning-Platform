import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaBookOpen, 
  FaClock, 
  FaGraduationCap, 
  FaPlay,
  FaCheck,
  FaBookmark,
  FaStar,
  FaFilter,
  FaSearch,
  FaChevronDown,
  FaChevronRight,
  FaTrophy,
  FaFire
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const SubjectExplorer = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [userProgress, setUserProgress] = useState({});

  const semesters = ["All", 1, 2, 3, 4, 5, 6, 7, 8];
  const categories = ["All", "Core", "Elective", "Lab", "Project"];

  useEffect(() => {
    fetchSubjects();
    fetchUserProgress();
  }, []);

  useEffect(() => {
    filterSubjects();
  }, [subjects, selectedSemester, selectedCategory, searchTerm]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/courses");
      setSubjects(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3000/api/progress/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const progressMap = {};
        response.data.data.courses?.forEach(course => {
          progressMap[course.courseId._id] = course.overallProgress;
        });
        setUserProgress(progressMap);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
    }
  };

  const filterSubjects = () => {
    let filtered = subjects;

    if (selectedSemester !== "All") {
      filtered = filtered.filter(subject => subject.semester === selectedSemester);
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(subject => subject.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(subject =>
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.short_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubjects(filtered);
  };

  const getProgressColor = (progress) => {
    if (progress === 0) return "bg-gray-200";
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getSubjectIcon = (category) => {
    switch (category) {
      case "Core": return <FaBookOpen />;
      case "Elective": return <FaStar />;
      case "Lab": return <FaPlay />;
      case "Project": return <FaTrophy />;
      default: return <FaGraduationCap />;
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: currentTheme.gradient }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-xl mt-4" style={{ color: currentTheme.text }}>Loading subjects...</p>
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

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-16 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: currentTheme.text }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            B.Tech CSE 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"> Subjects</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: currentTheme.textSecondary }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Master your B.Tech CSE curriculum with structured learning paths, 
            video resources, and progress tracking for every subject.
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <motion.section 
        className="pb-8 px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none transition-all duration-300"
                style={{ 
                  backgroundColor: currentTheme.card, 
                  color: currentTheme.text,
                  border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
                }}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                style={{ 
                  backgroundColor: currentTheme.card, 
                  color: currentTheme.text,
                  border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
                }}
              >
                {semesters.map(sem => (
                  <option key={sem} value={sem}>
                    {sem === "All" ? "All Semesters" : `Semester ${sem}`}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                style={{ 
                  backgroundColor: currentTheme.card, 
                  color: currentTheme.text,
                  border: `1px solid ${isDarkMode ? '#374151' : '#d1d5db'}`
                }}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "All" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p style={{ color: currentTheme.textSecondary }}>
              Showing {filteredSubjects.length} of {subjects.length} subjects
            </p>
          </div>
        </div>
      </motion.section>

      {/* Subjects Grid */}
      <motion.section 
        className="pb-20 px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          {filteredSubjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSubjects.map((subject, index) => (
                <motion.div
                  key={subject._id}
                  className="rounded-xl border overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  style={{ 
                    backgroundColor: currentTheme.card,
                    borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                  }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Subject Header */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg text-white">
                          {getSubjectIcon(subject.category)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold" style={{ color: currentTheme.text }}>
                            {subject.short_name || subject.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm" style={{ color: currentTheme.textSecondary }}>
                            <span>Sem {subject.semester}</span>
                            <span>•</span>
                            <span>{subject.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Progress Indicator */}
                      {userProgress[subject._id] !== undefined && (
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-full border-4 border-gray-200 relative">
                            <div 
                              className={`absolute inset-0 rounded-full ${getProgressColor(userProgress[subject._id])}`}
                              style={{
                                background: `conic-gradient(#10b981 ${userProgress[subject._id] * 3.6}deg, #e5e7eb 0deg)`
                              }}
                            ></div>
                            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-gray-700">
                                {userProgress[subject._id]}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <h4 className="text-xl font-bold mb-2" style={{ color: currentTheme.text }}>
                      {subject.name}
                    </h4>
                    <p className="text-sm mb-4 line-clamp-3" style={{ color: currentTheme.textSecondary }}>
                      {subject.description}
                    </p>

                    {/* Subject Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: currentTheme.textSecondary }}>
                      <div className="flex items-center gap-1">
                        <FaBookOpen />
                        <span>{subject.units?.length || 0} Units</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaPlay />
                        <span>{subject.totalTopics || 0} Topics</span>
                      </div>
                      {subject.credits && (
                        <div className="flex items-center gap-1">
                          <FaTrophy />
                          <span>{subject.credits} Credits</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link 
                        to={`/subject/${subject._id}`}
                        className="flex-1"
                      >
                        <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                          <FaPlay />
                          Start Learning
                        </button>
                      </Link>
                      
                      {userProgress[subject._id] > 0 && (
                        <button className="px-3 py-2 border border-rose-500 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300">
                          <FaFire />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <FaBookOpen className="text-6xl mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
              <h3 className="text-2xl font-bold mb-2" style={{ color: currentTheme.text }}>
                No subjects found
              </h3>
              <p style={{ color: currentTheme.textSecondary }}>
                Try adjusting your search criteria or filters.
              </p>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default SubjectExplorer;