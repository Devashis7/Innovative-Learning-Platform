import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios";

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/users/enrolled-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEnrolledCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className="text-xl mt-4 text-gray-900 dark:text-gray-100">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <NavBar />
      <div className="pt-20 px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {getGreeting()}, {user?.name || "Student"} 👋
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Ready to continue your learning journey?
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Link to="/courses" className="text-rose-500 hover:text-rose-600 flex items-center gap-2">
                Explore Courses <FaArrowRight />
              </Link>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <FaBookOpen className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{course.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">0% complete</p> 
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

                    <Link to={`/course/${course._id}`}>
                      <button className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                        Go to Course
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-center bg-white dark:bg-gray-800">
                <FaBookOpen className="text-4xl mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">No courses enrolled yet</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Start your learning journey by exploring our available courses.
                </p>
                <Link to="/courses">
                  <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-2 rounded-lg">
                    Browse Courses
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
