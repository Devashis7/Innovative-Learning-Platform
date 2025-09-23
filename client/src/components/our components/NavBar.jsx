
import React, { useContext, useState } from "react";
import logo from "/logo.png";
import profileImage from "/profileImage.png";
import UserProfileSubCard from "./UserProfileSubCard";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const [userSubProfile, setUserSubProfile] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-[#242e44] h-20 border-b w-full text-white fixed top-0 left-0 transition-all duration-500 z-50">
      <div className="w-10/12 mx-auto flex justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logo} alt="Nexus Logo" className="h-[80px]" />
          </Link>
          <p className="text-4xl font-bold">Nexus</p>
        </div>

        <div className="flex items-center gap-6 relative">
          {user && (
            <Link to="/profile">
              <button className="border p-2 rounded-md hover:bg-white hover:text-black transition">
                My Profile
              </button>
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin-dashboard">
              <button className="border p-2 rounded-md hover:bg-white hover:text-black transition">
                Admin Only
              </button>
            </Link>
          )}

          <img
            src={profileImage}
            alt="User Profile"
            className="h-[50px] cursor-pointer rounded-full"
            onClick={() => setUserSubProfile(!userSubProfile)}
          />

          {userSubProfile && (
            <div className="absolute right-0 top-16">
              <UserProfileSubCard />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
