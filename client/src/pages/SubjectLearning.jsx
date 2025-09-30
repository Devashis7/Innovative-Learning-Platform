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
  const { id: subjectId } = useParams();
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
  const [localCompletionState, setLocalCompletionState] = useState({});

  useEffect(() => {
    fetchSubjectDetails();
    fetchUserProgress();
    enrollInSubjectIfNeeded();
  }, [subjectId]);

  const enrollInSubjectIfNeeded = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // This will auto-enroll the user if they're not already enrolled
        await axios.post(`http://localhost:3000/api/progress/enroll`, 
          { courseId: subjectId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("✅ User enrolled in subject (or already enrolled)");
      }
    } catch (error) {
      console.log("📝 Enrollment check completed (might already be enrolled)");
    }
  };

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
      console.log("🔄 Fetching progress for subject:", subjectId);
      console.log("🔗 Full URL:", `http://localhost:3000/api/progress/course/${subjectId}`);
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(`http://localhost:3000/api/progress/course/${subjectId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("📊 Progress response:", response.data);
        console.log("📊 Progress data structure:", JSON.stringify(response.data.data, null, 2));
        console.log("🌐 Response status:", response.status);
        console.log("🔗 Request URL:", response.config.url);
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
      // Set empty progress structure if not found
      setProgress({
        courseId: subjectId,
        unitsProgress: [],
        overallProgress: 0,
        totalSubtopics: 0,
        completedSubtopics: 0,
        totalTimeSpent: 0,
        streak: 0
      });
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
    console.log("🔄 Toggling subtopic completion:", { unitId, topicId, subtopicId });
    
    try {
      const token = localStorage.getItem("token");
      console.log("🔑 Token exists:", !!token);
      
      if (token) {
        const subtopicProgress = getSubtopicProgress(unitId, topicId, subtopicId);
        const isCompleted = !subtopicProgress?.isCompleted;
        
        // Remove local state dependency - rely on database only
        
        console.log("📊 Current progress:", subtopicProgress);
        console.log("✅ New completion state:", isCompleted);
        console.log(isCompleted ? "☑️ Checking subtopic" : "☐ Unchecking subtopic");
        
        const requestData = { 
          courseId: subjectId,
          subtopicId: subtopicId,
          completed: isCompleted
        };
        console.log("📤 Sending request:", requestData);
        
        const response = await axios.post(
          `http://localhost:3000/api/progress/mark`,
          requestData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log("📥 Response:", response.data);
        
        // Update progress state immediately with returned data
        if (response.data.success && response.data.data.unitsProgress) {
          console.log("� Updating progress from response...");
          setProgress({
            courseId: response.data.data.courseId,
            unitsProgress: response.data.data.unitsProgress,
            overallProgress: response.data.data.overallProgress,
            totalSubtopics: response.data.data.totalSubtopics || 0,
            completedSubtopics: response.data.data.completedSubtopics || 0,
            totalTimeSpent: response.data.data.totalTimeSpent || 0
          });
          console.log("✅ Progress updated immediately from response!");
        } else {
          // Fallback: refresh progress from server
          console.log("� Refreshing progress from server...");
          await fetchUserProgress();
        }
      } else {
        console.error("❌ No authentication token found");
      }
    } catch (error) {
      console.error("❌ Error updating progress:", error);
      if (error.response) {
        console.error("❌ Response data:", error.response.data);
        console.error("❌ Response status:", error.response.status);
      }
    }
  };

  const toggleBookmark = async (unitId, topicId, subtopicId) => {
    // Bookmark functionality not implemented yet
    console.log("Bookmark functionality coming soon!");
  };

  const saveNotes = async (subtopicId, notes) => {
    // Notes functionality not implemented yet
    console.log("Notes functionality coming soon!");
    setUserNotes(prev => ({ ...prev, [subtopicId]: notes }));
  };

  const getSubtopicProgress = (unitId, topicId, subtopicId) => {
    const unit = progress?.unitsProgress?.find(u => u.unitId === unitId);
    const topic = unit?.topicsProgress?.find(t => t.topicId === topicId);
    const subtopic = topic?.subtopicsProgress?.find(st => st.subtopicId === subtopicId);
    
    return subtopic || { isCompleted: false, bookmarked: false, notes: "", timeSpent: 0 };
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
      <div className={`${currentTheme.background.primary} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className={`${currentTheme.text.primary} text-xl mt-4`}>Loading subject...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className={`${currentTheme.background.primary} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <FaBook className={`text-6xl mx-auto mb-4 ${currentTheme.text.secondary}`} />
          <h2 className={`text-2xl font-bold mb-2 ${currentTheme.text.primary}`}>Subject Not Found</h2>
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
    <div className={`${currentTheme.background.primary} min-h-screen transition-colors duration-300`}>
      {/* Navigation */}
      <div className="fixed top-0 w-full z-50">
        <NavBar />
      </div>

      <div className="pt-20 flex">
        {/* Left Sidebar - Subject Overview */}
        <div className={`${currentTheme.background.card} w-80 h-screen sticky top-20 overflow-y-auto border-r ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="p-6">
            {/* Back Button */}
            <Link to="/subjects" className="inline-flex items-center gap-2 mb-6 text-rose-500 hover:text-rose-600">
              <FaArrowLeft />
              <span>Back to Subjects</span>
            </Link>

            {/* Subject Header */}
            <div className="mb-6">
              <h1 className={`text-2xl font-bold ${currentTheme.text.primary} mb-2`}>
                {subject.name}
              </h1>
              <div className={`flex items-center gap-4 text-sm ${currentTheme.text.secondary}`}>
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
              <div className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} mb-6 p-4 rounded-lg`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold ${currentTheme.text.primary}`}>Overall Progress</span>
                  <span className="text-lg font-bold text-green-500">{progress.overallProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.overallProgress}%` }}
                  ></div>
                </div>
                <div className={`flex justify-between text-sm mt-2 ${currentTheme.text.secondary}`}>
                  <span>Total Time: {Math.floor((progress.totalTimeSpent || 0) / 60)}h {(progress.totalTimeSpent || 0) % 60}m</span>
                  <span>Streak: {progress.streak || 0} days</span>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className={`${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/30'} text-center p-3 rounded-lg`}>
                <div className="text-2xl font-bold text-blue-500">{subject.units?.length || 0}</div>
                <div className={`text-sm ${currentTheme.text.secondary}`}>Units</div>
              </div>
              <div className={`${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/30'} text-center p-3 rounded-lg`}>
                <div className="text-2xl font-bold text-green-500">{subject.totalTopics || 0}</div>
                <div className={`text-sm ${currentTheme.text.secondary}`}>Topics</div>
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
                  className={`${currentTheme.background.card} rounded-lg border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: unitIndex * 0.1 }}
                >
                  {/* Unit Header */}
                  <div 
                    className={`${isDarkMode ? 'bg-gray-800/20' : 'bg-gray-100/20'} p-4 cursor-pointer flex items-center justify-between hover:bg-opacity-80 transition-all duration-200`}
                    onClick={() => toggleUnit(unit._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {expandedUnits.has(unit._id) ? <FaChevronDown /> : <FaChevronRight />}
                        <h3 className={`text-xl font-bold ${currentTheme.text.primary}`}>
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
                    
                    <div className={`text-sm ${currentTheme.text.secondary}`}>
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
                            <p className={`text-sm mb-4 ${currentTheme.text.secondary}`}>
                              {unit.description}
                            </p>
                          )}

                          {/* Topics */}
                          {unit.topics?.map((topic, topicIndex) => (
                            <div 
                              key={topic._id}
                              className={`border rounded-lg overflow-hidden ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                              {/* Topic Header */}
                              <div 
                                className={`${isDarkMode ? 'bg-gray-800/10' : 'bg-gray-100/10'} p-3 cursor-pointer flex items-center justify-between hover:bg-opacity-80 transition-all duration-200`}
                                onClick={() => toggleTopic(topic._id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2">
                                    {expandedTopics.has(topic._id) ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                                    <h4 className={`font-semibold ${currentTheme.text.primary}`}>
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
                                
                                <div className={`text-xs ${currentTheme.text.secondary}`}>
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
                                              isCompleted ? (isDarkMode ? 'bg-green-900/20 border-green-500' : 'bg-green-50 border-green-200') : (isDarkMode ? 'bg-gray-800/5' : 'bg-gray-50/5')
                                            }`}>
                                            {/* Completion Checkbox */}
                                            <button
                                              onClick={() => toggleSubtopicCompletion(unit._id, topic._id, subtopic._id)}
                                              className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-105 ${
                                                isCompleted 
                                                  ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30' 
                                                  : (isDarkMode ? 'border-gray-600 hover:border-green-400 bg-gray-700' : 'border-gray-300 hover:border-green-500 bg-white')
                                              }`}
                                              title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                                            >
                                              {isCompleted && <FaCheck className="text-sm font-bold" />}
                                            </button>

                                            {/* Subtopic Content */}
                                            <div className="flex-1">
                                              <div className="flex items-center gap-2 mb-1">
                                                <h5 
                                                  className={`font-medium ${isCompleted ? 'line-through text-gray-500' : currentTheme.text.primary}`}
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
                                                <p className={`text-sm ${currentTheme.text.secondary}`}>
                                                  {subtopic.description}
                                                </p>
                                              )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                              {/* YouTube Links */}
                                              {subtopic.resources?.filter(resource => resource.type === 'youtube').map((resource, index) => (
                                                <a
                                                  key={`${subtopic._id}-youtube-${index}`}
                                                  href={resource.link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                                                  title={resource.description || "Watch Video"}
                                                >
                                                  <FaYoutube />
                                                </a>
                                              ))}
                                              
                                              {/* Notes/PDF Resources */}
                                              {subtopic.resources?.filter(resource => resource.type === 'note').map((resource, index) => (
                                                <a
                                                  key={`${subtopic._id}-note-${index}`}
                                                  href={resource.link}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-105"
                                                  title={resource.description || "View Notes"}
                                                >
                                                  <FaExternalLinkAlt />
                                                </a>
                                              ))}

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
                                                key={subtopic._id}
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
              className={`${currentTheme.background.card} rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-xl font-bold ${currentTheme.text.primary}`}>
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
                  className={`${currentTheme.background.primary} ${currentTheme.text.primary} w-full h-64 p-4 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg resize-none`}
                />
                
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setShowNotesModal(false)}
                    className={`px-4 py-2 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg hover:bg-gray-50 transition-colors ${currentTheme.text.primary}`}>
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