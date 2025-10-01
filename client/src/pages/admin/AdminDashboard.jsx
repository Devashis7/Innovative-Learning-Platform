import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AdminLayout from './AdminLayout';
import { FaBook, FaUsers, FaChartBar, FaUserGraduate, FaArrowUp, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../utils/api';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch dashboard statistics
      const [statsResponse, activityResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/dashboard/stats`, { headers }),
        axios.get(`${API_BASE_URL}/api/admin/dashboard/activity`, { headers })
      ]);

      setStats(statsResponse.data.data);
      setRecentActivity(activityResponse.data.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      if (err.response?.status === 401) {
        setError('Authentication required. Please log in as an admin.');
      } else if (err.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else {
        setError('Failed to fetch dashboard data. Please try again.');
      }
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <AdminLayout>
      <div className='text-gray-900 dark:text-white'>
        {/* Header */}
        <div className='mb-10'>
            <h1 className='text-4xl font-bold'>{getGreeting()}, {user?.name} 👋</h1>
            <p className='text-gray-500 dark:text-gray-400 mt-2'>Welcome to the admin dashboard. Here's a summary of your platform.</p>
        </div>

        {/* Stats Cards */}
        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md animate-pulse">
                        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
                    </div>
                ))}
            </div>
        ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> {error}</span>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <StatCard 
                    icon={<FaBook className="text-blue-500" />} 
                    title="Total Courses" 
                    value={stats.totalCourses || 0} 
                />
                <StatCard 
                    icon={<FaUsers className="text-green-500" />} 
                    title="Total Users" 
                    value={stats.totalUsers || 0} 
                />
                <StatCard 
                    icon={<FaUserGraduate className="text-purple-500" />} 
                    title="Active Users" 
                    value={stats.activeUsers || 0} 
                />
                <StatCard 
                    icon={<FaArrowUp className="text-orange-500" />} 
                    title="Total Enrollments" 
                    value={stats.totalEnrollments || 0} 
                />
                <StatCard 
                    icon={<FaChartBar className="text-red-500" />} 
                    title="Completed Subtopics" 
                    value={stats.completedSubtopics || 0} 
                />
                <StatCard 
                    icon={<FaClock className="text-indigo-500" />} 
                    title="Recent Enrollments" 
                    value={stats.recentEnrollments || 0}
                    subtitle="Last 7 days" 
                />
            </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            {loading ? (
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse border-b border-gray-200 dark:border-gray-700 py-3">
                            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : recentActivity.length > 0 ? (
                <ul className="space-y-3">
                    {recentActivity.map((activity, index) => (
                        <li 
                            key={index} 
                            className={`py-3 flex items-center space-x-3 ${
                                index !== recentActivity.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
                            }`}
                        >
                            <div className={`p-2 rounded-full ${getActivityIconBg(activity.type)}`}>
                                {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-900 dark:text-white">{activity.message}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatTimeAgo(activity.timestamp)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No recent activity found.</p>
            )}
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ icon, title, value, subtitle }) => (
  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200'>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{title}</p>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  </div>
);

// Helper functions for activity display
const getActivityIcon = (type) => {
  switch (type) {
    case 'user_registration':
      return <FaUsers className="text-green-600 text-sm" />;
    case 'enrollment':
      return <FaBook className="text-blue-600 text-sm" />;
    case 'course_added':
      return <FaArrowUp className="text-purple-600 text-sm" />;
    default:
      return <FaChartBar className="text-gray-600 text-sm" />;
  }
};

const getActivityIconBg = (type) => {
  switch (type) {
    case 'user_registration':
      return 'bg-green-100 dark:bg-green-900/20';
    case 'enrollment':
      return 'bg-blue-100 dark:bg-blue-900/20';
    case 'course_added':
      return 'bg-purple-100 dark:bg-purple-900/20';
    default:
      return 'bg-gray-100 dark:bg-gray-900/20';
  }
};

const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    return `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }
};

export default AdminDashboard;
