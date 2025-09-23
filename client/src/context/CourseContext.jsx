import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create context
const CourseContext = createContext();

// Custom hook
export const useCourse = () => useContext(CourseContext);

// Provider
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseURL = "http://localhost:5000/api/courses";

  // Token config
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(baseURL, getAuthConfig());
      setCourses(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses.");
    } finally {
      setLoading(false);
    }
  };

  // Add new course
  const addCourse = async (courseData) => {
    try {
      const res = await axios.post(baseURL, courseData, getAuthConfig());
      setCourses((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  // Update course
  const updateCourse = async (id, updatedData) => {
    try {
      const res = await axios.put(`${baseURL}/${id}`, updatedData, getAuthConfig());
      setCourses((prev) =>
        prev.map((course) => (course._id === id ? res.data : course))
      );
    } catch (err) {
      console.error("Error updating course:", err);
    }
  };

  // Delete course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${baseURL}/${id}`, getAuthConfig());
      setCourses((prev) => prev.filter((course) => course._id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
    }
  };

  // Add heading to a course
  const addHeading = async (courseId, headingData) => {
    try {
      await axios.post(`${baseURL}/${courseId}/headings`, headingData, getAuthConfig());
      fetchCourses();
    } catch (err) {
      console.error("Error adding heading:", err);
    }
  };

  // Add topic under a heading
  const addTopic = async (courseId, headingId, topicData) => {
    try {
      await axios.post(`${baseURL}/${courseId}/headings/${headingId}/topics`, topicData, getAuthConfig());
      fetchCourses();
    } catch (err) {
      console.error("Error adding topic:", err);
    }
  };

  // Fetch data on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        fetchCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        addHeading,
        addTopic,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};
