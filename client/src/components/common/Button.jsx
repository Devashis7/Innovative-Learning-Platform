import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const Button = ({ children, border, isDarkMode }) => {
  const { currentTheme } = useTheme();
  
  // Fallback classes
  const borderClass = currentTheme?.border || (isDarkMode ? 'border-gray-600' : 'border-gray-300');
  const textClass = currentTheme?.text?.primary || (isDarkMode ? 'text-white' : 'text-gray-900');
  
  const buttonClasses = border 
    ? `border-2 ${borderClass} py-3 px-4 hover:border-rose-500 hover:bg-rose-500/10 rounded-full ${textClass} transition-all duration-300`
    : `bg-gradient-to-r from-rose-500 to-orange-500 py-3 px-4 hover:from-rose-600 hover:to-orange-600 rounded-full text-white transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25`;

  return (
    <button className={buttonClasses}>
      <div className="flex items-center gap-2">
        {children}
        <FaArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </button>
  );
};

export default Button;
