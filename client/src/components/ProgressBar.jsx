import React from "react";
const ProgressBar = ({ progress }) => {

  return (
    <div className="w-[40%] p-4 border rounded-md border-gray-400 bg-[#1E2A44]">
      <div className="flex justify-between">
        <p className="text-sm text-gray-500">Your Progress:</p>
        <p className="text-lg text-[#F43F5E] font-bold">
          {Math.round(progress)}% complete
        </p>
      </div>
      {/* Progress Bar Container */}
      <div className="w-full h-4 mt-2 bg-gray-700 rounded-full overflow-hidden">
        {/* Animated Progress Bar */}
        <div
          className="h-full bg-[#F43F5E] rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
