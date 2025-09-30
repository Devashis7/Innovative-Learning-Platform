import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const Card = ({ item, ItemIndex }) => {
  const { isDarkMode, colors, currentTheme } = useTheme();
  
  // Fallback classes in case theme is undefined
  const backgroundClass = currentTheme?.background?.card || (isDarkMode ? 'bg-gray-800' : 'bg-white');
  const borderClass = currentTheme?.border || (isDarkMode ? 'border-gray-700' : 'border-gray-200');
  const textPrimaryClass = currentTheme?.text?.primary || (isDarkMode ? 'text-white' : 'text-gray-900');
  const textMutedClass = currentTheme?.text?.muted || (isDarkMode ? 'text-gray-400' : 'text-gray-600');
  
  const handleClick = () => {
    console.log("Clicked Card Index:", ItemIndex);
    console.log("Clicked Card Data:", item);
  };

  return (
    <div
      onClick={handleClick}
      className={`min-w-72 w-72 h-80 p-5 ${backgroundClass} rounded-lg shadow-lg border ${borderClass} hover:border-rose-500/50 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-105 flex flex-col`}
    >
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"></div>
          <span className="text-sm font-medium text-rose-500">COURSE</span>
        </div>
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${textPrimaryClass}`}>{item.name || item.title}</h3>
      <p className={`${textMutedClass} mb-4 line-clamp-3 flex-grow`}>{item.short_description || item.description}</p>

      <div className="mt-auto">
        <Link to={`/course/${item._id || item.id || ItemIndex}`}>
          <Button border={true} isDarkMode={isDarkMode}>Try it free</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
