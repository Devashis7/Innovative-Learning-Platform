import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import AdminLayout from './AdminLayout';
import { FaBook, FaUsers, FaChartBar } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ courses: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mock API call
    const fetchStats = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats({ courses: 12, users: 150 });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stats');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={<FaBook className="text-blue-500" />} title="Total Courses" value={stats.courses} />
                <StatCard icon={<FaUsers className="text-green-500" />} title="Total Users" value={stats.users} />
                <StatCard icon={<FaChartBar className="text-yellow-500" />} title="Active Users" value="78" />
            </div>
        )}

        {/* Recent Activity */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <ul>
                <li className="border-b border-gray-200 dark:border-gray-700 py-3">User 'Jane Doe' enrolled in 'Introduction to React'.</li>
                <li className="border-b border-gray-200 dark:border-gray-700 py-3">New course 'Advanced Node.js' was added.</li>
                <li className="py-3">User 'John Smith' completed 'CSS Fundamentals'.</li>
            </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md flex items-center space-x-4'>
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;
