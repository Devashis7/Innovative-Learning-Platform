import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaBookOpen } from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import { CourseContext } from '@/context/CourseContext';

const Courses = () => {
  const { courses, loading } = useContext(CourseContext);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  useEffect(() => {
    const results = courses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, courses]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <NavBar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold mb-4">
              Explore Our <span className="text-rose-600">Courses</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find the perfect course to boost your skills and advance your career. 
              Our curriculum is designed for learners at all stages.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500 transition-shadow"
              />
            </div>
          </div>

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <Link to={`/course/${course._id}`} key={course._id} className="block transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-rose-500">COURSE</span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{course.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-4">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="inline-block bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 px-3 py-1 text-sm font-semibold rounded-full">
                            View Details
                        </span>
                        <FaBookOpen className="text-rose-500" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <FaBookOpen className="text-6xl text-gray-400 dark:text-gray-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">No Courses Found</h2>
              <p className="text-gray-600 dark:text-gray-400">Try a different search term to find the course you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
