import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaArrowLeft, 
  FaPlay, 
  FaCheck, 
  FaBookmark,
  FaRegBookmark,
  FaStickyNote,
  FaClock,
  FaChevronDown,
  FaChevronRight,
  FaYoutube,
  FaExternalLinkAlt,
  FaLightbulb,
  FaFire,
  FaTrophy,
  FaBook,
  FaDownload
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";
import axios from "axios";

const SubjectLearning = () => {
  const { subjectId } = useParams();
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const [subject, setSubject] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedUnits, setExpandedUnits] = useState(new Set());
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [activeSubtopic, setActiveSubtopic] = useState(null);
  const [userNotes, setUserNotes] = useState({});
  const [showNotesModal, setShowNotesModal] = useState(false);

  useEffect(() => {
    fetchSubjectDetails();
    fetchUserProgress();
  }, [subjectId]);

  const fetchSubjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/courses/${subjectId}`);
      setSubject(response.data.data);
      // Auto-expand first unit
      if (response.data.data.units.length > 0) {
        setExpandedUnits(new Set([response.data.data.units[0]._id]));
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`http://localhost:3000/api/progress/course/${subjectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProgress(response.data.data);
        
        // Extract notes from progress
        const notes = {};
        response.data.data.unitsProgress?.forEach(unit => {
          unit.topicsProgress?.forEach(topic => {
            topic.subtopicsProgress?.forEach(subtopic => {
              if (subtopic.notes) {
                notes[subtopic.subtopicId] = subtopic.notes;
              }
            });
          });
        });
        setUserNotes(notes);
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      // Initialize progress if not found
      if (error.response?.status === 404) {
        initializeProgress();
      }
    }
  };

  const initializeProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post("http://localhost:3000/api/progress/initialize", 
          { courseId: subjectId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchUserProgress();
      }
    } catch (error) {
      console.error("Error initializing progress:", error);
    }
  };

  const toggleUnit = (unitId) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const toggleTopic = (topicId) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicId)) {
      newExpanded.delete(topicId);
    } else {
      newExpanded.add(topicId);
    }
    setExpandedTopics(newExpanded);
  };

  const toggleSubtopicCompletion = async (unitId, topicId, subtopicId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const subtopicProgress = getSubtopicProgress(unitId, topicId, subtopicId);
        const isCompleted = !subtopicProgress?.isCompleted;
        
        await axios.put(
          `http://localhost:3000/api/progress/course/${subjectId}/unit/${unitId}/topic/${topicId}/subtopic/${subtopicId}`,
          { 
            isCompleted,
            timeSpent: isCompleted ? 30 : 0 // Estimate 30 minutes per completion
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Refresh progress
        fetchUserProgress();
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const toggleBookmark = async (unitId, topicId, subtopicId) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `http://localhost:3000/api/progress/course/${subjectId}/unit/${unitId}/topic/${topicId}/subtopic/${subtopicId}/bookmark`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        // Refresh progress
        fetchUserProgress();
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const saveNotes = async (subtopicId, notes) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // Find the path for this subtopic
        let unitId, topicId;
        subject.units.forEach(unit => {
          unit.topics.forEach(topic => {
            topic.subtopics.forEach(subtopic => {
              if (subtopic._id === subtopicId) {
                unitId = unit._id;
                topicId = topic._id;
              }
            });
          });
        });

        await axios.put(
          `http://localhost:3000/api/progress/course/${subjectId}/unit/${unitId}/topic/${topicId}/subtopic/${subtopicId}`,
          { notes },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setUserNotes(prev => ({ ...prev, [subtopicId]: notes }));
      }
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const getSubtopicProgress = (unitId, topicId, subtopicId) => {
    const unit = progress?.unitsProgress?.find(u => u.unitId === unitId);
    const topic = unit?.topicsProgress?.find(t => t.topicId === topicId);
    return topic?.subtopicsProgress?.find(st => st.subtopicId === subtopicId);
  };

  const getUnitProgress = (unitId) => {
    const unit = progress?.unitsProgress?.find(u => u.unitId === unitId);
    return unit?.completionPercentage || 0;
  };

  const getTopicProgress = (unitId, topicId) => {
    const unit = progress?.unitsProgress?.find(u => u.unitId === unitId);
    const topic = unit?.topicsProgress?.find(t => t.topicId === topicId);
    return topic?.completionPercentage || 0;
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: currentTheme.gradient }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-xl mt-4" style={{ color: currentTheme.text }}>Loading subject...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ background: currentTheme.gradient }}
      >
        <div className="text-center">
          <FaBook className="text-6xl mx-auto mb-4" style={{ color: currentTheme.textSecondary }} />
          <h2 className="text-2xl font-bold mb-2" style={{ color: currentTheme.text }}>Subject Not Found</h2>
          <Link to="/subjects">
            <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold">
              Browse Subjects
            </button>
          </Link>
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

      <div className="pt-20 flex">
        {/* Left Sidebar - Subject Overview */}
        <div 
          className="w-80 h-screen sticky top-20 overflow-y-auto border-r"
          style={{ 
            backgroundColor: currentTheme.card,
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }}
        >
          <div className="p-6">
            {/* Back Button */}
            <Link to="/subjects" className="inline-flex items-center gap-2 mb-6 text-rose-500 hover:text-rose-600">
              <FaArrowLeft />
              <span>Back to Subjects</span>
            </Link>

            {/* Subject Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2" style={{ color: currentTheme.text }}>
                {subject.name}
              </h1>
              <div className="flex items-center gap-4 text-sm" style={{ color: currentTheme.textSecondary }}>
                <span>Semester {subject.semester}</span>
                <span>•</span>
                <span>{subject.category}</span>
                {subject.credits && (
                  <>
                    <span>•</span>
                    <span>{subject.credits} Credits</span>
                  </>
                )}
              </div>
            </div>

            {/* Overall Progress */}
            {progress && (
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: currentTheme.background + '50' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold" style={{ color: currentTheme.text }}>Overall Progress</span>
                  <span className="text-lg font-bold text-green-500">{progress.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.overallProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm mt-2" style={{ color: currentTheme.textSecondary }}>
                  <span>Total Time: {Math.floor((progress.totalTimeSpent || 0) / 60)}h {(progress.totalTimeSpent || 0) % 60}m</span>
                  <span>Streak: {progress.streak || 0} days</span>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: currentTheme.background + '30' }}>
                <div className="text-2xl font-bold text-blue-500">{subject.units?.length || 0}</div>
                <div className="text-sm" style={{ color: currentTheme.textSecondary }}>Units</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ backgroundColor: currentTheme.background + '30' }}>
                <div className="text-2xl font-bold text-green-500">{subject.totalTopics || 0}</div>
                <div className="text-sm" style={{ color: currentTheme.textSecondary }}>Topics</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Learning Interface */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Subject Units */}
            <div className="space-y-6">
              {subject.units?.map((unit, unitIndex) => (
                <motion.div
                  key={unit._id}
                  className="rounded-lg border overflow-hidden"
                  style={{ 
                    backgroundColor: currentTheme.card,
                    borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: unitIndex * 0.1 }}
                >
                  {/* Unit Header */}
                  <div 
                    className="p-4 cursor-pointer flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
                    style={{ backgroundColor: currentTheme.background + '20' }}
                    onClick={() => toggleUnit(unit._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {expandedUnits.has(unit._id) ? <FaChevronDown /> : <FaChevronRight />}
                        <h3 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                          Unit {unitIndex + 1}: {unit.name}
                        </h3>
                      </div>
                      
                      {/* Unit Progress */}
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${getUnitProgress(unit._id)}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-blue-500">
                          {getUnitProgress(unit._id)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm" style={{ color: currentTheme.textSecondary }}>
                      {unit.topics?.length || 0} topics
                    </div>
                  </div>

                  {/* Unit Content */}
                  <AnimatePresence>
                    {expandedUnits.has(unit._id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 space-y-4">
                          {unit.description && (
                            <p className="text-sm mb-4" style={{ color: currentTheme.textSecondary }}>
                              {unit.description}
                            </p>
                          )}

                          {/* Topics */}
                          {unit.topics?.map((topic, topicIndex) => (
                            <div 
                              key={topic._id}
                              className="border rounded-lg overflow-hidden"
                              style={{ borderColor: isDarkMode ? '#374151' : '#e5e7eb' }}
                            >
                              {/* Topic Header */}
                              <div 
                                className="p-3 cursor-pointer flex items-center justify-between hover:bg-opacity-80 transition-all duration-200"
                                style={{ backgroundColor: currentTheme.background + '10' }}
                                onClick={() => toggleTopic(topic._id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    {expandedTopics.has(topic._id) ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                                    <h4 className="font-semibold" style={{ color: currentTheme.text }}>
                                      {topic.title}
                                    </h4>
                                  </div>
                                  
                                  {/* Topic Progress */}
                                  <div className="flex items-center gap-2">
                                    <div className="w-12 h-1.5 bg-gray-200 rounded-full">
                                      <div 
                                        className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full transition-all duration-300"
                                        style={{ width: `${getTopicProgress(unit._id, topic._id)}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-semibold text-green-500">
                                      {getTopicProgress(unit._id, topic._id)}%
                                    </span>
                                  </div>
                                </div>
                                
                                <div className="text-xs" style={{ color: currentTheme.textSecondary }}>
                                  {topic.subtopics?.length || 0} subtopics
                                </div>
                              </div>

                              {/* Subtopics */}
                              <AnimatePresence>
                                {expandedTopics.has(topic._id) && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="p-3 space-y-2">
                                      {topic.subtopics?.map((subtopic, subtopicIndex) => {
                                        const subtopicProgress = getSubtopicProgress(unit._id, topic._id, subtopic._id);
                                        const isCompleted = subtopicProgress?.isCompleted || false;
                                        const isBookmarked = subtopicProgress?.bookmarked || false;
                                        
                                        return (
                                          <div 
                                            key={subtopic._id}
                                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                                              isCompleted ? 'bg-green-50 border-green-200' : 'hover:bg-opacity-50'
                                            }`}
                                            style={{ 
                                              backgroundColor: isCompleted 
                                                ? (isDarkMode ? '#064e3b20' : '#f0fdf4') 
                                                : currentTheme.background + '05',
                                              borderColor: isCompleted 
                                                ? '#10b981' 
                                                : (isDarkMode ? '#374151' : '#e5e7eb')
                                            }}
                                          >
                                            {/* Completion Checkbox */}
                                            <button
                                              onClick={() => toggleSubtopicCompletion(unit._id, topic._id, subtopic._id)}
                                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                                isCompleted 
                                                  ? 'bg-green-500 border-green-500 text-white' 
                                                  : 'border-gray-300 hover:border-green-500'
                                              }`}
                                            >
                                              {isCompleted && <FaCheck className="text-xs" />}
                                            </button>

                                            {/* Subtopic Content */}
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 mb-1">
                                                <h5 
                                                  className={`font-medium ${isCompleted ? 'line-through text-gray-500' : ''}`}
                                                  style={{ color: isCompleted ? currentTheme.textSecondary : currentTheme.text }}
                                                >
                                                  {subtopic.title}
                                                </h5>
                                                
                                                {/* Difficulty Badge */}
                                                {subtopic.difficulty && (
                                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                                    subtopic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                                    subtopic.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                                  }`}>
                                                    {subtopic.difficulty}
                                                  </span>
                                                )}
                                              </div>
                                              
                                              {subtopic.description && (
                                                <p className="text-sm" style={{ color: currentTheme.textSecondary }}>
                                                  {subtopic.description}
                                                </p>
                                              )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                              {/* YouTube Link */}
                                              {subtopic.youtubeLink && (
                                                <a
                                                  href={subtopic.youtubeLink}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200"
                                                  title="Watch Video"
                                                >
                                                  <FaYoutube />
                                                </a>
                                              )}

                                              {/* Bookmark Button */}
                                              <button
                                                onClick={() => toggleBookmark(unit._id, topic._id, subtopic._id)}
                                                className={`p-2 rounded-lg transition-all duration-200 ${
                                                  isBookmarked 
                                                    ? 'text-yellow-500 bg-yellow-100' 
                                                    : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-100'
                                                }`}
                                                title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                              >
                                                {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                                              </button>

                                              {/* Notes Button */}
                                              <button
                                                onClick={() => {
                                                  setActiveSubtopic(subtopic._id);
                                                  setShowNotesModal(true);
                                                }}
                                                className={`p-2 rounded-lg transition-all duration-200 ${
                                                  userNotes[subtopic._id] 
                                                    ? 'text-blue-500 bg-blue-100' 
                                                    : 'text-gray-400 hover:text-blue-500 hover:bg-blue-100'
                                                }`}
                                                title="Add Notes"
                                              >
                                                <FaStickyNote />
                                              </button>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes Modal */}
      <AnimatePresence>
        {showNotesModal && activeSubtopic && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              style={{ backgroundColor: currentTheme.card }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold" style={{ color: currentTheme.text }}>
                    Personal Notes
                  </h3>
                  <button
                    onClick={() => setShowNotesModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <textarea
                  value={userNotes[activeSubtopic] || ""}
                  onChange={(e) => setUserNotes(prev => ({ ...prev, [activeSubtopic]: e.target.value }))}
                  placeholder="Add your personal notes here..."
                  className="w-full h-64 p-4 border rounded-lg resize-none"
                  style={{ 
                    backgroundColor: currentTheme.background,
                    color: currentTheme.text,
                    borderColor: isDarkMode ? '#374151' : '#d1d5db'
                  }}
                />
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowNotesModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    style={{ 
                      borderColor: isDarkMode ? '#374151' : '#d1d5db',
                      color: currentTheme.text
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      saveNotes(activeSubtopic, userNotes[activeSubtopic] || "");
                      setShowNotesModal(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    Save Notes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectLearning;