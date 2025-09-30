import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaPlus, 
  FaBook, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSave,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaYoutube,
  FaGraduationCap
} from "react-icons/fa";
import AdminLayout from "./AdminLayout";
import { useTheme } from "@/context/ThemeContext";
import { fetchCourses, createCourse, updateCourse, deleteCourse } from "../../utils/api";

const CourseManagement = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState(new Set());
  
  // Form state
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    short_name: "",
    semester: 1,
    category: "Core",
    credits: 3,
    image_link: "",
    prerequisites: [],
    learningOutcomes: [],
    units: []
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, courseForm);
      } else {
        await createCourse(courseForm);
      }
      loadCourses();
      resetForm();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setCourseForm({
      name: course.name,
      description: course.description,
      short_name: course.short_name,
      semester: course.semester,
      category: course.category,
      credits: course.credits,
      image_link: course.image_link || "",
      prerequisites: course.prerequisites || [],
      learningOutcomes: course.learningOutcomes || [],
      units: course.units || []
    });
    setShowCourseForm(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        loadCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const resetForm = () => {
    setCourseForm({
      name: "",
      description: "",
      short_name: "",
      semester: 1,
      category: "Core",
      credits: 3,
      image_link: "",
      prerequisites: [],
      learningOutcomes: [],
      units: []
    });
    setEditingCourse(null);
    setShowCourseForm(false);
  };

  const toggleCourseExpansion = (courseId) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const addUnit = () => {
    setCourseForm(prev => ({
      ...prev,
      units: [...prev.units, {
        name: "",
        description: "",
        order: prev.units.length + 1,
        topics: []
      }]
    }));
  };

  const updateUnit = (unitIndex, field, value) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, index) => 
        index === unitIndex ? { ...unit, [field]: value } : unit
      )
    }));
  };

  const removeUnit = (unitIndex) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.filter((_, index) => index !== unitIndex)
    }));
  };

  const addTopic = (unitIndex) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, index) => 
        index === unitIndex ? {
          ...unit,
          topics: [...unit.topics, {
            title: "",
            description: "",
            order: unit.topics.length + 1,
            subtopics: []
          }]
        } : unit
      )
    }));
  };

  const updateTopic = (unitIndex, topicIndex, field, value) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, uIndex) => 
        uIndex === unitIndex ? {
          ...unit,
          topics: unit.topics.map((topic, tIndex) => 
            tIndex === topicIndex ? { ...topic, [field]: value } : topic
          )
        } : unit
      )
    }));
  };

  const removeTopic = (unitIndex, topicIndex) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, uIndex) => 
        uIndex === unitIndex ? {
          ...unit,
          topics: unit.topics.filter((_, tIndex) => tIndex !== topicIndex)
        } : unit
      )
    }));
  };

  const addSubtopic = (unitIndex, topicIndex) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, uIndex) => 
        uIndex === unitIndex ? {
          ...unit,
          topics: unit.topics.map((topic, tIndex) => 
            tIndex === topicIndex ? {
              ...topic,
              subtopics: [...topic.subtopics, {
                title: "",
                description: "",
                youtubeLink: "",
                difficulty: "Medium",
                estimatedTime: 30,
                resources: []
              }]
            } : topic
          )
        } : unit
      )
    }));
  };

  const updateSubtopic = (unitIndex, topicIndex, subtopicIndex, field, value) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, uIndex) => 
        uIndex === unitIndex ? {
          ...unit,
          topics: unit.topics.map((topic, tIndex) => 
            tIndex === topicIndex ? {
              ...topic,
              subtopics: topic.subtopics.map((subtopic, sIndex) => 
                sIndex === subtopicIndex ? { ...subtopic, [field]: value } : subtopic
              )
            } : topic
          )
        } : unit
      )
    }));
  };

  const removeSubtopic = (unitIndex, topicIndex, subtopicIndex) => {
    setCourseForm(prev => ({
      ...prev,
      units: prev.units.map((unit, uIndex) => 
        uIndex === unitIndex ? {
          ...unit,
          topics: unit.topics.map((topic, tIndex) => 
            tIndex === topicIndex ? {
              ...topic,
              subtopics: topic.subtopics.filter((_, sIndex) => sIndex !== subtopicIndex)
            } : topic
          )
        } : unit
      )
    }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl font-bold ${currentTheme.text.primary}`}>
              Course Management
            </h1>
            <p className={currentTheme.text.secondary}>
              Manage B.Tech CSE subjects and their content structure
            </p>
          </div>
          
          <button
            onClick={() => setShowCourseForm(true)}
            className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <FaPlus />
            Add New Subject
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`${currentTheme.background.card} p-6 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <FaBook className="text-2xl text-blue-500" />
              <div>
                <p className={`text-2xl font-bold ${currentTheme.text.primary}`}>
                  {courses.length}
                </p>
                <p className={`text-sm ${currentTheme.text.secondary}`}>
                  Total Subjects
                </p>
              </div>
            </div>
          </div>

          <div className={`${currentTheme.background.card} p-6 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <FaGraduationCap className="text-2xl text-green-500" />
              <div>
                <p className={`text-2xl font-bold ${currentTheme.text.primary}`}>
                  {courses.reduce((acc, course) => acc + (course.totalTopics || 0), 0)}
                </p>
                <p className={`text-sm ${currentTheme.text.secondary}`}>
                  Total Topics
                </p>
              </div>
            </div>
          </div>

          <div className={`${currentTheme.background.card} p-6 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <FaYoutube className="text-2xl text-red-500" />
              <div>
                <p className={`text-2xl font-bold ${currentTheme.text.primary}`}>
                  {courses.filter(course => course.category === "Core").length}
                </p>
                <p className={`text-sm ${currentTheme.text.secondary}`}>
                  Core Subjects
                </p>
              </div>
            </div>
          </div>

          <div className={`${currentTheme.background.card} p-6 rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <FaEdit className="text-2xl text-purple-500" />
              <div>
                <p className={`text-2xl font-bold ${currentTheme.text.primary}`}>
                  {courses.filter(course => course.category === "Elective").length}
                </p>
                <p className={`text-sm ${currentTheme.text.secondary}`}>
                  Electives
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Courses List */}
        <div className={`${currentTheme.background.card} rounded-xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-bold ${currentTheme.text.primary}`}>
              All Subjects ({courses.length})
            </h2>
          </div>

          <div className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {courses.map((course) => (
              <div key={course._id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      key={course._id}
                      onClick={() => toggleCourseExpansion(course._id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      {expandedCourses.has(course._id) ? <FaChevronDown /> : <FaChevronRight />}
                    </button>
                    
                    <div>
                      <h3 className={`text-lg font-semibold ${currentTheme.text.primary}`}>
                        {course.name} ({course.short_name})
                      </h3>
                      <div className={`flex items-center gap-4 text-sm ${currentTheme.text.secondary}`}>
                        <span>Semester {course.semester}</span>
                        <span>•</span>
                        <span>{course.category}</span>
                        <span>•</span>
                        <span>{course.credits} Credits</span>
                        <span>•</span>
                        <span>{course.units?.length || 0} Units</span>
                        <span>•</span>
                        <span>{course.totalTopics || 0} Topics</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit Course"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete Course"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {expandedCourses.has(course._id) && (
                  <motion.div
                    className="mt-4 pl-8"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className={`mb-4 ${currentTheme.text.secondary}`}>
                      {course.description}
                    </p>

                    {course.units?.map((unit, unitIndex) => (
                      <div key={unit._id} className={`mb-4 p-4 border rounded-lg ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h4 className={`font-semibold mb-2 ${currentTheme.text.primary}`}>
                          Unit {unitIndex + 1}: {unit.name}
                        </h4>
                        <p className={`text-sm mb-3 ${currentTheme.text.secondary}`}>
                          {unit.description}
                        </p>
                        
                        <div className="pl-4 space-y-3">
                          {unit.topics?.map((topic, topicIndex) => (
                            <div key={topic._id} className={`border rounded p-3 ${isDarkMode ? 'border-gray-600 bg-gray-800/30' : 'border-gray-100 bg-gray-50'}`}>
                              <h5 className={`font-medium mb-2 ${currentTheme.text.primary}`}>
                                📘 {topic.title} ({topic.subtopics?.length || 0} subtopics)
                              </h5>
                              {topic.description && (
                                <p className={`text-sm mb-2 ${currentTheme.text.secondary}`}>
                                  {topic.description}
                                </p>
                              )}
                              <div className="pl-4 space-y-1">
                                {topic.subtopics?.map((subtopic, subtopicIndex) => (
                                  <div key={subtopic._id} className="flex items-center justify-between py-1">
                                    <span className={`text-sm ${currentTheme.text.primary}`}>
                                      📄 {subtopic.title}
                                      {subtopic.difficulty && (
                                        <span className={`ml-2 px-2 py-1 text-xs rounded ${
                                          subtopic.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                          subtopic.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                                          'bg-yellow-100 text-yellow-800'
                                        }`}>
                                          {subtopic.difficulty}
                                        </span>
                                      )}
                                    </span>
                                    <div className="flex items-center gap-2">
                                      {subtopic.estimatedTime && (
                                        <span className={`text-xs ${currentTheme.text.secondary}`}>
                                          {subtopic.estimatedTime}min
                                        </span>
                                      )}
                                      {subtopic.resources?.some(r => r.type === 'youtube') && (
                                        <FaYoutube className="text-red-500 text-sm" title="Has YouTube resources" />
                                      )}
                                      <span className={`text-xs ${currentTheme.text.secondary}`}>
                                        {subtopic.resources?.length || 0} resources
                                      </span>
                                    </div>
                                  </div>
                                ))}
                                {(!topic.subtopics || topic.subtopics.length === 0) && (
                                  <p className={`text-xs italic ${currentTheme.text.secondary}`}>
                                    No subtopics added yet
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                          {(!unit.topics || unit.topics.length === 0) && (
                            <p className={`text-sm italic ${currentTheme.text.secondary}`}>
                              No topics added yet
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}

            {courses.length === 0 && (
              <div className="p-12 text-center">
                <FaBook className={`text-4xl mx-auto mb-4 ${currentTheme.text.secondary}`} />
                <h3 className={`text-lg font-semibold mb-2 ${currentTheme.text.primary}`}>
                  No subjects found
                </h3>
                <p className={currentTheme.text.secondary}>
                  Start by adding your first B.Tech CSE subject
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Course Form Modal */}
        {showCourseForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`${currentTheme.background.card} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
              <div className={`p-6 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center">
                  <h2 className={`text-2xl font-bold ${currentTheme.text.primary}`}>
                    {editingCourse ? "Edit Subject" : "Add New Subject"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                      Subject Name *
                    </label>
                    <input
                      type="text"
                      value={courseForm.name}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                      Short Name *
                    </label>
                    <input
                      type="text"
                      value={courseForm.short_name}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, short_name: e.target.value }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                      Semester *
                    </label>
                    <select
                      value={courseForm.semester}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      required
                    >
                      {[1,2,3,4,5,6,7,8].map(sem => (
                        <option key={sem} value={sem} className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                      Category *
                    </label>
                    <select
                      value={courseForm.category}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, category: e.target.value }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      required
                    >
                      <option value="Core" className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                        Core
                      </option>
                      <option value="Elective" className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                        Elective
                      </option>
                      <option value="Lab" className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                        Lab
                      </option>
                      <option value="Project" className={isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}>
                        Project
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                      Credits *
                    </label>
                    <input
                      type="number"
                      value={courseForm.credits}
                      onChange={(e) => setCourseForm(prev => ({ ...prev, credits: parseInt(e.target.value) }))}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none ${
                        isDarkMode 
                          ? 'bg-gray-800 text-white border-gray-700' 
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                      min="1"
                      max="6"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${currentTheme.text.primary}`}>
                    Description *
                  </label>
                  <textarea
                    value={courseForm.description}
                    onChange={(e) => setCourseForm(prev => ({ ...prev, description: e.target.value }))}
                    className={`w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-rose-500 focus:outline-none resize-none ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white border-gray-700' 
                        : 'bg-white text-gray-900 border-gray-300'
                    }`}
                    required
                  />
                </div>

                {/* Course Structure - Units, Topics, Subtopics */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className={`text-xl font-semibold ${currentTheme.text.primary}`}>
                      Course Structure
                    </h3>
                    <button
                      type="button"
                      onClick={addUnit}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <FaPlus />
                      Add Unit
                    </button>
                  </div>

                  {courseForm.units.map((unit, unitIndex) => (
                    <div key={unitIndex} className={`border rounded-lg p-4 space-y-3 ${isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-300 bg-gray-50'}`}>
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Unit name (e.g., Arrays and Strings)"
                            value={unit.name}
                            onChange={(e) => updateUnit(unitIndex, 'name', e.target.value)}
                            className={`p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              isDarkMode 
                                ? 'bg-gray-800 text-white border-gray-700' 
                                : 'bg-white text-gray-900 border-gray-300'
                            }`}
                          />
                          <input
                            type="text"
                            placeholder="Unit description (optional)"
                            value={unit.description || ''}
                            onChange={(e) => updateUnit(unitIndex, 'description', e.target.value)}
                            className={`p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                              isDarkMode 
                                ? 'bg-gray-800 text-white border-gray-700' 
                                : 'bg-white text-gray-900 border-gray-300'
                            }`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeUnit(unitIndex)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove Unit"
                        >
                          <FaTrash />
                        </button>
                      </div>

                      {/* Topics Section */}
                      <div className="ml-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <h4 className={`text-lg font-medium ${currentTheme.text.primary}`}>
                            Topics
                          </h4>
                          <button
                            type="button"
                            onClick={() => addTopic(unitIndex)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors flex items-center gap-1 text-sm"
                          >
                            <FaPlus />
                            Add Topic
                          </button>
                        </div>

                        {unit.topics?.map((topic, topicIndex) => (
                          <div key={topicIndex} className={`border rounded p-3 space-y-2 ${isDarkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-200 bg-white'}`}>
                            <div className="flex justify-between items-start gap-3">
                              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Topic title (e.g., Array Operations)"
                                  value={topic.title}
                                  onChange={(e) => updateTopic(unitIndex, topicIndex, 'title', e.target.value)}
                                  className={`p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none text-sm ${
                                    isDarkMode 
                                      ? 'bg-gray-700 text-white border-gray-600' 
                                      : 'bg-gray-50 text-gray-900 border-gray-200'
                                  }`}
                                />
                                <input
                                  type="text"
                                  placeholder="Topic description (optional)"
                                  value={topic.description || ''}
                                  onChange={(e) => updateTopic(unitIndex, topicIndex, 'description', e.target.value)}
                                  className={`p-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none text-sm ${
                                    isDarkMode 
                                      ? 'bg-gray-700 text-white border-gray-600' 
                                      : 'bg-gray-50 text-gray-900 border-gray-200'
                                  }`}
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removeTopic(unitIndex, topicIndex)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Remove Topic"
                              >
                                <FaTrash size={14} />
                              </button>
                            </div>

                            {/* Subtopics Section */}
                            <div className="ml-4 space-y-2">
                              <div className="flex justify-between items-center">
                                <h5 className={`text-md font-medium ${currentTheme.text.primary}`}>
                                  Subtopics
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => addSubtopic(unitIndex, topicIndex)}
                                  className="bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors flex items-center gap-1 text-xs"
                                >
                                  <FaPlus />
                                  Add Subtopic
                                </button>
                              </div>

                              {topic.subtopics?.map((subtopic, subtopicIndex) => (
                                <div key={subtopicIndex} className={`border rounded p-2 space-y-2 ${isDarkMode ? 'border-gray-500 bg-gray-600/50' : 'border-gray-100 bg-gray-50'}`}>
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1 space-y-2">
                                      <input
                                        type="text"
                                        placeholder="Subtopic title (e.g., Array Declaration and Initialization)"
                                        value={subtopic.title}
                                        onChange={(e) => updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'title', e.target.value)}
                                        className={`w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm ${
                                          isDarkMode 
                                            ? 'bg-gray-600 text-white border-gray-500' 
                                            : 'bg-white text-gray-900 border-gray-100'
                                        }`}
                                      />
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <input
                                          type="text"
                                          placeholder="Description (optional)"
                                          value={subtopic.description || ''}
                                          onChange={(e) => updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'description', e.target.value)}
                                          className={`p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm ${
                                            isDarkMode 
                                              ? 'bg-gray-600 text-white border-gray-500' 
                                              : 'bg-white text-gray-900 border-gray-100'
                                          }`}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                          <select
                                            value={subtopic.difficulty || 'Medium'}
                                            onChange={(e) => updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'difficulty', e.target.value)}
                                            className={`p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm ${
                                              isDarkMode 
                                                ? 'bg-gray-600 text-white border-gray-500' 
                                                : 'bg-white text-gray-900 border-gray-100'
                                            }`}
                                          >
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                          </select>
                                          <input
                                            type="number"
                                            placeholder="Time (min)"
                                            value={subtopic.estimatedTime || 30}
                                            onChange={(e) => updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'estimatedTime', parseInt(e.target.value))}
                                            className={`p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:outline-none text-sm ${
                                              isDarkMode 
                                                ? 'bg-gray-600 text-white border-gray-500' 
                                                : 'bg-white text-gray-900 border-gray-100'
                                            }`}
                                            min="5"
                                            max="180"
                                          />
                                        </div>
                                      </div>

                                      {/* Resources Section */}
                                      <div className="space-y-2">
                                        <label className={`text-xs font-medium ${currentTheme.text.primary}`}>
                                          Resources (YouTube, Notes, etc.)
                                        </label>
                                        <div className="space-y-2">
                                          {subtopic.resources?.map((resource, resourceIndex) => (
                                            <div key={resourceIndex} className="flex gap-2 items-center">
                                              <select
                                                value={resource.type || 'youtube'}
                                                onChange={(e) => {
                                                  const newResources = [...(subtopic.resources || [])];
                                                  newResources[resourceIndex] = { ...resource, type: e.target.value };
                                                  updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'resources', newResources);
                                                }}
                                                className={`p-1 border rounded text-xs ${
                                                  isDarkMode 
                                                    ? 'bg-gray-600 text-white border-gray-500' 
                                                    : 'bg-white text-gray-900 border-gray-100'
                                                }`}
                                              >
                                                <option value="youtube">YouTube</option>
                                                <option value="note">Notes</option>
                                                <option value="pdf">PDF</option>
                                                <option value="link">Link</option>
                                              </select>
                                              <input
                                                type="url"
                                                placeholder="Resource URL"
                                                value={resource.link || ''}
                                                onChange={(e) => {
                                                  const newResources = [...(subtopic.resources || [])];
                                                  newResources[resourceIndex] = { ...resource, link: e.target.value };
                                                  updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'resources', newResources);
                                                }}
                                                className={`flex-1 p-1 border rounded text-xs ${
                                                  isDarkMode 
                                                    ? 'bg-gray-600 text-white border-gray-500' 
                                                    : 'bg-white text-gray-900 border-gray-100'
                                                }`}
                                              />
                                              <input
                                                type="text"
                                                placeholder="Description"
                                                value={resource.description || ''}
                                                onChange={(e) => {
                                                  const newResources = [...(subtopic.resources || [])];
                                                  newResources[resourceIndex] = { ...resource, description: e.target.value };
                                                  updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'resources', newResources);
                                                }}
                                                className={`flex-1 p-1 border rounded text-xs ${
                                                  isDarkMode 
                                                    ? 'bg-gray-600 text-white border-gray-500' 
                                                    : 'bg-white text-gray-900 border-gray-100'
                                                }`}
                                              />
                                              <button
                                                type="button"
                                                onClick={() => {
                                                  const newResources = subtopic.resources?.filter((_, i) => i !== resourceIndex) || [];
                                                  updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'resources', newResources);
                                                }}
                                                className="text-red-500 hover:text-red-700 p-1"
                                                title="Remove Resource"
                                              >
                                                <FaTrash size={10} />
                                              </button>
                                            </div>
                                          ))}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const newResources = [...(subtopic.resources || []), { type: 'youtube', link: '', description: '' }];
                                              updateSubtopic(unitIndex, topicIndex, subtopicIndex, 'resources', newResources);
                                            }}
                                            className="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition-colors flex items-center gap-1"
                                          >
                                            <FaPlus size={8} />
                                            Add Resource
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeSubtopic(unitIndex, topicIndex, subtopicIndex)}
                                      className="text-red-500 hover:text-red-700 p-1"
                                      title="Remove Subtopic"
                                    >
                                      <FaTrash size={12} />
                                    </button>
                                  </div>
                                </div>
                              ))}

                              {topic.subtopics?.length === 0 && (
                                <p className={`text-sm text-center py-2 ${currentTheme.text.secondary}`}>
                                  No subtopics added yet. Click "Add Subtopic" to get started.
                                </p>
                              )}
                            </div>
                          </div>
                        ))}

                        {unit.topics?.length === 0 && (
                          <p className={`text-sm text-center py-2 ${currentTheme.text.secondary}`}>
                            No topics added yet. Click "Add Topic" to get started.
                          </p>
                        )}
                      </div>
                    </div>
                  ))}

                  {courseForm.units.length === 0 && (
                    <p className={`text-center py-8 ${currentTheme.text.secondary}`}>
                      No units added yet. Click "Add Unit" to start building your course structure.
                    </p>
                  )}
                </div>

                {/* Form Buttons */}
                <div className={`flex justify-end gap-3 pt-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <button
                    type="button"
                    onClick={resetForm}
                    className={`${currentTheme.text.primary} px-6 py-3 border ${isDarkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg hover:bg-gray-50 transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <FaSave />
                    {editingCourse ? "Update Subject" : "Create Subject"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default CourseManagement;