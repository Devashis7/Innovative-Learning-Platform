import React, { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaGraduationCap, 
  FaTrophy, 
  FaFire, 
  FaClock,
  FaCalendarAlt,
  FaChartLine,
  FaBookOpen,
  FaMedal,
  FaBullseye,
  FaUserEdit,
  FaCog,
  FaBell,
  FaShieldAlt,
  FaDownload,
  FaShare
} from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import NavBar from '@/components/NavBar';
import axios from 'axios';

const ProfilePage = () => {
  const { user, loading } = useContext(AuthContext);
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    university: '',
    year: '',
    branch: '',
    interests: []
  });
  const [stats, setStats] = useState({
    totalSubjects: 0,
    completedSubjects: 0,
    totalProgress: 0,
    streak: 0,
    timeSpent: 0,
    badges: []
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || 'Passionate learner exploring B.Tech CSE curriculum',
        location: user.location || '',
        university: user.university || 'GIET University',
        year: user.year || '2nd Year',
        branch: user.branch || 'Computer Science & Engineering',
        interests: user.interests || ['Programming', 'Data Structures', 'Web Development']
      });
      fetchUserStats();
      fetchRecentActivity();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get("http://localhost:3000/api/progress/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const courses = response.data.data?.courses || [];
        const totalSubjects = courses.length;
        const completedSubjects = courses.filter(c => c.overallProgress === 100).length;
        const avgProgress = courses.length > 0 ? 
          Math.round(courses.reduce((acc, c) => acc + (c.overallProgress || 0), 0) / courses.length) : 0;
        
        setStats({
          totalSubjects,
          completedSubjects,
          totalProgress: avgProgress,
          streak: 7, // Mock data
          timeSpent: 142, // Mock data in hours
          badges: ['First Steps', 'Quick Learner', 'Consistent'] // Mock data
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentActivity = () => {
    // Mock recent activity data
    setRecentActivity([
      { id: 1, action: 'Completed', subject: 'Data Structures & Algorithms', topic: 'Binary Trees', time: '2 hours ago' },
      { id: 2, action: 'Started', subject: 'Database Management Systems', topic: 'SQL Basics', time: '1 day ago' },
      { id: 3, action: 'Earned badge', subject: 'Quick Learner', topic: '', time: '2 days ago' },
      { id: 4, action: 'Completed', subject: 'Operating Systems', topic: 'Process Management', time: '3 days ago' },
    ]);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      // Here you would typically save to backend
      console.log('Saving profile data:', profileData);
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className={`${currentTheme.background.primary} min-h-screen flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
          <p className={`${currentTheme.text.primary} text-xl mt-4`}>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${currentTheme.background.primary} min-h-screen transition-colors duration-300`}>
      <NavBar />
      
      <motion.div 
        className="pt-24 pb-12 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <motion.div 
            className={`${currentTheme.background.card} rounded-xl p-8 mb-8 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center mb-4">
                  <FaUser className="text-4xl text-white" />
                </div>
                <button className="text-rose-500 hover:text-rose-600 text-sm flex items-center gap-2">
                  <FaUserEdit />
                  Change Photo
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`text-3xl font-bold ${currentTheme.text.primary} bg-transparent border-b-2 border-rose-500 focus:outline-none`}
                      />
                    ) : (
                      <h1 className={`text-3xl font-bold ${currentTheme.text.primary}`}>
                        {profileData.name}
                      </h1>
                    )}
                    <p className={`${currentTheme.text.secondary} mt-1`}>
                      {profileData.branch} • {profileData.year}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                        >
                          <FaSave />
                          Save
                        </button>
                        <button
                          onClick={handleEditToggle}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                        >
                          <FaTimes />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleEditToggle}
                        className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={profileData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className={`w-full p-3 rounded-lg border ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-white'} ${currentTheme.text.primary} focus:ring-2 focus:ring-rose-500 focus:outline-none`}
                      rows="3"
                    />
                  ) : (
                    <p className={`${currentTheme.text.secondary} text-lg`}>
                      {profileData.bio}
                    </p>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${currentTheme.text.primary}`}>{stats.totalSubjects}</div>
                    <div className={`text-sm ${currentTheme.text.secondary}`}>Subjects</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-green-500`}>{stats.completedSubjects}</div>
                    <div className={`text-sm ${currentTheme.text.secondary}`}>Completed</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-blue-500`}>{stats.totalProgress}%</div>
                    <div className={`text-sm ${currentTheme.text.secondary}`}>Avg Progress</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold text-orange-500`}>{stats.streak}</div>
                    <div className={`text-sm ${currentTheme.text.secondary}`}>Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg">
              {[
                { id: 'overview', label: 'Overview', icon: FaChartLine },
                { id: 'activity', label: 'Activity', icon: FaClock },
                { id: 'achievements', label: 'Achievements', icon: FaTrophy },
                { id: 'settings', label: 'Settings', icon: FaCog }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white dark:bg-gray-700 text-rose-500 shadow-sm'
                      : `${currentTheme.text.secondary} hover:text-rose-500`
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Learning Stats */}
                <div className={`${currentTheme.background.card} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-xl font-bold ${currentTheme.text.primary} mb-4 flex items-center gap-2`}>
                    <FaChartLine className="text-rose-500" />
                    Learning Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className={currentTheme.text.secondary}>Time Spent</span>
                      <span className={`font-semibold ${currentTheme.text.primary}`}>{stats.timeSpent}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={currentTheme.text.secondary}>Current Streak</span>
                      <span className={`font-semibold text-orange-500`}>{stats.streak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={currentTheme.text.secondary}>Avg Progress</span>
                      <span className={`font-semibold text-blue-500`}>{stats.totalProgress}%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={`lg:col-span-2 ${currentTheme.background.card} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <h3 className={`text-xl font-bold ${currentTheme.text.primary} mb-4 flex items-center gap-2`}>
                    <FaClock className="text-rose-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map(activity => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className={currentTheme.text.primary}>
                            <span className="font-semibold">{activity.action}</span> {activity.subject}
                            {activity.topic && <span className={currentTheme.text.secondary}> - {activity.topic}</span>}
                          </p>
                          <p className={`text-sm ${currentTheme.text.secondary}`}>{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.badges.map((badge, index) => (
                  <motion.div
                    key={badge}
                    className={`${currentTheme.background.card} rounded-xl p-6 border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-center`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaMedal className="text-2xl text-white" />
                    </div>
                    <h4 className={`font-bold ${currentTheme.text.primary} mb-2`}>{badge}</h4>
                    <p className={`text-sm ${currentTheme.text.secondary}`}>
                      Earned for excellent progress in learning
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Add other tab contents here */}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
