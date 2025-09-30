import React, { createContext, useState, useEffect } from 'react';
import { fetchCourses as fetchCoursesAPI } from '@/utils/api';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCoursesAPI();
        setCourses(response.data.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  return (
    <CourseContext.Provider value={{ courses, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};
