import React, { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import MyTable from "./MyTable";

const TopicCard = ({ heading , updateProgress }) => {

  
  return (
    <div className="space-y-4">
      {heading.map((item, index) => {
        const [isCollapsed, setIsCollapsed] = useState(false);
        return (
          <div
            key={index}
            className="p-2 rounded-md border-gray-500 border-[0.5px] bg-[#1E2A44]"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-base font-medium text-white">{item.name}</h2>

              <div
                className="p-1 rounded-md border-gray-500 border-[0.5px] cursor-pointer transition-transform duration-300"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <HiChevronDown
                  size={25}
                  className={`transform transition-transform duration-300 ${
                    isCollapsed ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            </div>

            {/* Table */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isCollapsed ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <MyTable
                topics={item.topics || []}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopicCard;
