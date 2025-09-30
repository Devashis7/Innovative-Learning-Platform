import React, { useContext } from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdSchool } from "react-icons/md";
import { AuthContext } from "@/context/AuthContext"; 
const ProfileCard = () => {
  const { user } = useContext(AuthContext); 

  return (
    <div
      className="bg-gray-700 mt-10 text-white p-6 border
     rounded-lg w-full max-w-sm mx-auto"
    >
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            className="text-gray-500"
          >
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold">{user?.name || "Guest User"}</h2>
        <p className="text-gray-500 text-sm mb-4">{user?.nickname || null}</p>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <MdEmail className="text-xl text-gray-500 mr-4" />
          <span className="text-white">{user?.email || "No Email"}</span>
        </div>
        
      </div>
    </div>
  );
};

export default ProfileCard;
