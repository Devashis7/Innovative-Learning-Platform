import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_BASE_URL } from '@/utils/api';
import { 
  FaArrowLeft, 
  FaBookOpen, 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaPlay,
  FaCheck,
  FaLock,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import { useTheme } from '@/context/ThemeContext';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTheme, isDarkMode } = useTheme();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUnits, setExpandedUnits] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/courses/${id}`);
        
        if (!response.ok) {
          throw new Error('Course not found');
        }

        const data = await response.json();
        setCourse(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const toggleUnit = (unitIndex) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitIndex]: !prev[unitIndex]
    }));
  };

  const toggleTopic = (unitIndex, topicIndex) => {
    const key = `${unitIndex}-${topicIndex}`;
    setExpandedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleStartCourse = () => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    
    if (token) {
      // User is logged in, proceed to learning
      navigate(`/subject/${id}/learning`);
    } else {
      // User not logged in, redirect to signup with course ID
      navigate(`/signup?courseId=${id}&redirect=learning`);
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className={`text-2xl font-bold mb-4 ${currentTheme?.text?.primary || (isDarkMode ? 'text-white' : 'text-gray-900')}`}>
              Course Not Found
            </h2>
            <p className={`text-lg mb-6 ${currentTheme?.text?.muted || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
              {error}
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-rose-600 hover:to-orange-600 transition-all duration-300"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  const backgroundClass = currentTheme?.background?.primary || (isDarkMode ? 'bg-gray-900' : 'bg-gray-50');
  const cardClass = currentTheme?.background?.card || (isDarkMode ? 'bg-gray-800' : 'bg-white');
  const borderClass = currentTheme?.border || (isDarkMode ? 'border-gray-700' : 'border-gray-200');
  const textPrimaryClass = currentTheme?.text?.primary || (isDarkMode ? 'text-white' : 'text-gray-900');
  const textMutedClass = currentTheme?.text?.muted || (isDarkMode ? 'text-gray-400' : 'text-gray-600');

  return (
    <div className={`min-h-screen ${backgroundClass}`}>
      <NavBar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            onClick={() => navigate('/courses')}
            className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border ${borderClass} hover:border-rose-500/50 transition-all duration-300 ${textPrimaryClass}`}
            whileHover={{ x: -2 }}
          >
            <FaArrowLeft />
            Back to Courses
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${cardClass} rounded-xl p-8 shadow-lg border ${borderClass} mb-8`}
              >
                <h1 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>
                  {course.name}
                </h1>
                <p className={`text-lg leading-relaxed ${textMutedClass}`}>
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 mt-6">
                  <div className="flex items-center gap-2">
                    <FaBookOpen className="text-rose-500" />
                    <span className={textMutedClass}>
                      {course.units?.length || 0} Units
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-rose-500" />
                    <span className={textMutedClass}>
                      Self-paced
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-rose-500" />
                    <span className={textMutedClass}>
                      All levels
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaStar className="text-rose-500" />
                    <span className={textMutedClass}>
                      4.8 rating
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Course Curriculum */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${cardClass} rounded-xl p-8 shadow-lg border ${borderClass}`}
              >
                <h2 className={`text-2xl font-bold mb-6 ${textPrimaryClass}`}>
                  Course Curriculum
                </h2>

                {course.units && course.units.length > 0 ? (
                  <div className="space-y-4">
                    {course.units.map((unit, unitIndex) => (
                      <div key={unitIndex} className={`border ${borderClass} rounded-lg`}>
                        <button
                          onClick={() => toggleUnit(unitIndex)}
                          className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200`}
                        >
                          <div className="flex items-center gap-3">
                            {expandedUnits[unitIndex] ? 
                              <FaChevronDown className="text-rose-500" /> : 
                              <FaChevronRight className="text-rose-500" />
                            }
                            <span className={`font-semibold ${textPrimaryClass}`}>
                              Unit {unitIndex + 1}: {unit.name}
                            </span>
                          </div>
                          <span className={`text-sm ${textMutedClass}`}>
                            {unit.topics?.length || 0} topics
                          </span>
                        </button>

                        {expandedUnits[unitIndex] && unit.topics && (
                          <div className="border-t border-gray-200 dark:border-gray-700">
                            {unit.topics.map((topic, topicIndex) => (
                              <div key={topicIndex}>
                                <button
                                  onClick={() => toggleTopic(unitIndex, topicIndex)}
                                  className="w-full flex items-center justify-between p-4 pl-12 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                                >
                                  <div className="flex items-center gap-3">
                                    {expandedTopics[`${unitIndex}-${topicIndex}`] ? 
                                      <FaChevronDown className="text-blue-500 text-sm" /> : 
                                      <FaChevronRight className="text-blue-500 text-sm" />
                                    }
                                    <span className={textPrimaryClass}>
                                      {topic.name}
                                    </span>
                                  </div>
                                  <span className={`text-sm ${textMutedClass}`}>
                                    {topic.subtopics?.length || 0} subtopics
                                  </span>
                                </button>

                                {expandedTopics[`${unitIndex}-${topicIndex}`] && topic.subtopics && (
                                  <div className="pl-16 pb-4">
                                    {topic.subtopics.map((subtopic, subtopicIndex) => (
                                      <div key={subtopicIndex} className="flex items-center gap-3 py-2">
                                        <FaPlay className="text-green-500 text-xs" />
                                        <span className={`text-sm ${textMutedClass}`}>
                                          {subtopic.name}
                                        </span>
                                        {subtopic.resources && subtopic.resources.length > 0 && (
                                          <span className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-2 py-1 rounded-full">
                                            {subtopic.resources.length} resources
                                          </span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FaBookOpen className={`text-4xl ${textMutedClass} mx-auto mb-4`} />
                    <p className={textMutedClass}>
                      Course curriculum is being prepared. Check back soon!
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`${cardClass} rounded-xl p-6 shadow-lg border ${borderClass} sticky top-24`}
              >
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold ${textPrimaryClass} mb-2`}>
                    Ready to start learning?
                  </h3>
                  <p className={`text-sm ${textMutedClass}`}>
                    Join thousands of students already learning
                  </p>
                </div>

                <button
                  onClick={handleStartCourse}
                  className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-rose-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25 mb-4"
                >
                  {localStorage.getItem('token') ? 'Start Learning' : 'Enroll Now'}
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500" />
                    <span className={textMutedClass}>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500" />
                    <span className={textMutedClass}>Self-paced learning</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500" />
                    <span className={textMutedClass}>Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaCheck className="text-green-500" />
                    <span className={textMutedClass}>Interactive content</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;