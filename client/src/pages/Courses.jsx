import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaFilter, 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaGraduationCap,
  FaChevronDown 
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import Card from "@/components/Card";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const Courses = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data.data || []);
        setFilteredCourses(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        // Set some default courses if API fails
        const defaultCourses = [
          {
            _id: "1",
            title: "Data Structures & Algorithms",
            description: "Master the fundamentals of DSA with hands-on practice",
            category: "Programming",
            level: "Intermediate",
            duration: "8 weeks",
            students: 1250,
            rating: 4.8,
            price: 99,
            thumbnail: "/course-dsa.jpg"
          },
          {
            _id: "2", 
            title: "Operating Systems",
            description: "Deep dive into OS concepts and system programming",
            category: "System Programming",
            level: "Advanced",
            duration: "10 weeks",
            students: 890,
            rating: 4.7,
            price: 129,
            thumbnail: "/course-os.jpg"
          },
          {
            _id: "3",
            title: "Database Management",
            description: "Learn SQL, NoSQL, and database design principles",
            category: "Database",
            level: "Beginner",
            duration: "6 weeks",
            students: 1450,
            rating: 4.9,
            price: 79,
            thumbnail: "/course-dbms.jpg"
          }
        ];
        setCourses(defaultCourses);
        setFilteredCourses(defaultCourses);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    let filtered = courses;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== "All") {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, courses]);

  const categories = ["All", "Programming", "System Programming", "Database", "Web Development", "Machine Learning"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827] min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-white text-xl mt-4">Loading courses...</p>
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
            Explore 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"> Our Courses</span>
          </motion.h1>
          <motion.p 
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: currentTheme.textSecondary }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover expertly crafted courses designed to advance your engineering career. 
            Learn from industry professionals and build real-world projects.
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
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:border-rose-500 focus:outline-none transition-colors duration-300"
                style={{ 
                  backgroundColor: currentTheme.card, 
                  borderColor: isDarkMode ? '#374151' : '#d1d5db',
                  color: currentTheme.text 
                }}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 rounded-lg hover:border-rose-500 transition-colors duration-300"
              style={{ 
                backgroundColor: currentTheme.card, 
                borderColor: isDarkMode ? '#374151' : '#d1d5db',
                color: currentTheme.text,
                border: '1px solid'
              }}
            >
              <FaFilter />
              <span>Filters</span>
              <FaChevronDown className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 rounded-lg border"
              style={{ 
                backgroundColor: currentTheme.card + '80', 
                borderColor: isDarkMode ? '#374151' : '#d1d5db' 
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <label className="block mb-2" style={{ color: currentTheme.textSecondary }}>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:border-rose-500 focus:outline-none"
                  style={{ 
                    backgroundColor: currentTheme.card, 
                    borderColor: isDarkMode ? '#374151' : '#d1d5db',
                    color: currentTheme.text 
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2" style={{ color: currentTheme.textSecondary }}>Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:border-rose-500 focus:outline-none"
                  style={{ 
                    backgroundColor: currentTheme.card, 
                    borderColor: isDarkMode ? '#374151' : '#d1d5db',
                    color: currentTheme.text 
                  }}
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <p style={{ color: currentTheme.textSecondary }}>
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          </div>
        </div>
      </motion.section>

      {/* Courses Grid */}
      <motion.section 
        className="pb-20 px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card item={course} ItemIndex={index} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FaGraduationCap className="text-6xl text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLevel("All");
                }}
                className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Courses;