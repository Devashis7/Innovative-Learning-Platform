import React from 'react';
import { useTheme } from '../context/ThemeContext';

const FeatureCard = ({ number, title, description }) => {
  const { currentTheme, isDarkMode } = useTheme();
  
  // Fallback classes in case currentTheme is undefined
  const backgroundClass = currentTheme?.background?.card || (isDarkMode ? 'bg-gray-800' : 'bg-white');
  const borderClass = currentTheme?.border || (isDarkMode ? 'border-gray-700' : 'border-gray-200');
  const textPrimaryClass = currentTheme?.text?.primary || (isDarkMode ? 'text-white' : 'text-gray-900');
  const textMutedClass = currentTheme?.text?.muted || (isDarkMode ? 'text-gray-400' : 'text-gray-600');
  
  return (
    <div className={`${backgroundClass} p-6 rounded-lg shadow-lg text-center border ${borderClass} hover:border-rose-500/50 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
      <h2 className="text-rose-500 text-4xl font-bold mb-4">{number}</h2>
      <h3 className={`text-xl font-semibold mb-2 ${textPrimaryClass}`}>{title}</h3>
      <p className={`text-sm ${textMutedClass}`}>{description}</p>
    </div>
  );
};

export default FeatureCard;
