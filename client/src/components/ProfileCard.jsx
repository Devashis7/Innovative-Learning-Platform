import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

const ProfileCard = ({ user, stats, onEdit, compact = false }) => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;

  return (
    <motion.div 
      className={`${currentTheme.background.card} rounded-xl shadow-lg p-6 border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } ${compact ? 'max-w-sm' : 'max-w-md'} mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="text-center">
        {/* Avatar */}
        <motion.div 
          className="w-24 h-24 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <FaUser className="text-3xl text-white" />
        </motion.div>

        {/* User Info */}
        <h2 className={`text-2xl font-bold ${currentTheme.text.primary} mb-2`}>
          {user?.name || 'Guest User'}
        </h2>
        
        <p className={`${currentTheme.text.secondary} mb-4 flex items-center justify-center gap-2`}>
          <FaGraduationCap className="text-rose-500" />
          {user?.email || 'No email provided'}
        </p>

        {/* Additional Info */}
        {!compact && (
          <div className="space-y-2 mb-4">
            {user?.university && (
              <p className={`text-sm ${currentTheme.text.secondary} flex items-center justify-center gap-2`}>
                <FaMapMarkerAlt className="text-orange-500" />
                {user.university}
              </p>
            )}
            {user?.branch && (
              <p className={`text-sm ${currentTheme.text.secondary} flex items-center justify-center gap-2`}>
                <FaCalendarAlt className="text-blue-500" />
                {user.branch} • {user.year || '2nd Year'}
              </p>
            )}
          </div>
        )}

        {/* Stats Section */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className={`text-xl font-bold ${currentTheme.text.primary}`}>
                {stats.totalSubjects || 0}
              </div>
              <div className={`text-xs ${currentTheme.text.secondary}`}>Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-green-500">
                {stats.completedSubjects || 0}
              </div>
              <div className={`text-xs ${currentTheme.text.secondary}`}>Completed</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-500">
                {stats.totalProgress || 0}%
              </div>
              <div className={`text-xs ${currentTheme.text.secondary}`}>Progress</div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        <motion.div 
          className={`bg-gradient-to-r ${
            isDarkMode 
              ? 'from-rose-900/30 to-orange-900/30' 
              : 'from-rose-100 to-orange-100'
          } rounded-lg p-4 mb-4`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className={`text-sm ${currentTheme.text.secondary}`}>
            {user?.bio || "Welcome to your learning journey! Keep exploring and growing."}
          </p>
        </motion.div>

        {/* Edit Button */}
        {onEdit && (
          <motion.button
            onClick={onEdit}
            className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white py-2 px-4 rounded-lg hover:from-rose-600 hover:to-orange-600 transition-all duration-200 font-medium"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Edit Profile
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;
