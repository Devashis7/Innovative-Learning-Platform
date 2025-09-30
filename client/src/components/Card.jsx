import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const Card = ({ item, ItemIndex }) => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const handleClick = () => {
    console.log("Clicked Card Index:", ItemIndex);
    console.log("Clicked Card Data:", item);
  };

  return (
    <div
      onClick={handleClick}
      className={`min-w-72 w-72 min-h-72 h-80 p-5 ${currentTheme.background.card} ${currentTheme.text.primary} rounded-lg shadow-lg border ${currentTheme.border} hover:border-rose-500/50 transition-all cursor-pointer`}
    >
      <div className={`flex items-center justify-center w-20 h-20 ${isDarkMode ? 'bg-gray-300' : 'bg-gray-200'} rounded-2xl mb-4`}>
        <img 
          src={item.image_link || item.thumbnail || "/default-course.jpg"} 
          alt={item.name || item.title || "Course"} 
          className="h-14" 
        />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${currentTheme.text.primary}`}>{item.name || item.title}</h3>
      <p className={`${currentTheme.text.muted} mb-4`}>{item.short_description || item.description}</p>

      <Link to={`/course/${item._id || item.id || ItemIndex}`}>
        <Button border={true}>Try it free</Button>
      </Link>
    </div>
  );
};

export default Card;
