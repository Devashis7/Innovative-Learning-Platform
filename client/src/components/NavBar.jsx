
import React, { useContext, useState } from "react";
import logo from "/logo.png";
import profileImage from "/profileImage.png";
import UserProfileSubCard from "./UserProfileSubCard";
import { Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { 
  FaGraduationCap, 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaBook, 
  FaUser, 
  FaSignInAlt, 
  FaUserPlus,
  FaChevronDown
} from "react-icons/fa";

const NavBar = () => {
  const [userSubProfile, setUserSubProfile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;

  // Dynamic navigation based on user authentication
  const getNavLinks = () => {
    if (user) {
      // Authenticated user navigation
      return [
        { name: "Dashboard", path: "/dashboard", icon: FaHome },
        { name: "Subjects", path: "/subjects", icon: FaBook },
        { name: "About", path: "/about", icon: FaGraduationCap },
      ];
    } else {
      // Public navigation
      return [
        { name: "Home", path: "/", icon: FaHome },
        { name: "Courses", path: "/courses", icon: FaBook },
        { name: "About", path: "/about", icon: FaGraduationCap },
      ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`${isDarkMode ? 'bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827]' : 'bg-gradient-to-r from-white via-gray-50 to-white'} backdrop-blur-lg border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <FaGraduationCap className="text-3xl text-rose-500 group-hover:text-orange-500 transition-colors duration-300" />
                <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-lg group-hover:bg-orange-500/20 transition-colors duration-300"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Innovative Learning
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-2 ${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} px-3 py-2 rounded-lg transition-all duration-300 group`}
              >
                <link.icon className="text-sm group-hover:text-rose-500 transition-colors duration-300" />
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                {user.role === "admin" && (
                  <Link to="/admin-dashboard">
                    <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                      Admin Panel
                    </button>
                  </Link>
                )}
                
                <Link to="/profile">
                  <button className={`${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-200 hover:bg-gray-300'} ${currentTheme.text.primary} px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2`}>
                    <FaUser className="text-sm" />
                    <span>Profile</span>
                  </button>
                </Link>

                <div className="relative">
                  <div 
                    className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${currentTheme.background.hover} transition-all duration-300`}
                    onClick={() => setUserSubProfile(!userSubProfile)}
                  >
                    <img
                      src={profileImage}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full border-2 border-rose-500/50 hover:border-rose-500 transition-colors duration-300"
                    />
                    <FaChevronDown className={`${currentTheme.text.muted} text-sm transition-transform duration-300 ${userSubProfile ? 'rotate-180' : ''}`} />
                  </div>

                  {userSubProfile && (
                    <div className="absolute right-0 top-16 z-50">
                      <UserProfileSubCard />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <button className={`flex items-center space-x-2 ${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} px-4 py-2 rounded-lg transition-all duration-300`}>
                    <FaSignInAlt className="text-sm" />
                    <span>Login</span>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center space-x-2">
                    <FaUserPlus className="text-sm" />
                    <span>Sign Up</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} p-2 rounded-lg transition-all duration-300`}
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${currentTheme.border} ${isDarkMode ? 'bg-[#1f2937]/95' : 'bg-white/95'} backdrop-blur-lg`}>
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-3 ${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} px-3 py-3 rounded-lg transition-all duration-300`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="text-rose-500" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              ))}

              {/* Mobile User Actions */}
              <div className={`border-t ${currentTheme.border} pt-4 space-y-3`}>
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full flex items-center space-x-3 text-gray-300 hover:text-white px-3 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                        <FaUser className="text-rose-500" />
                        <span>My Profile</span>
                      </button>
                    </Link>
                    
                    {user.role === "admin" && (
                      <Link to="/admin-dashboard" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-3 rounded-lg font-medium">
                          Admin Panel
                        </button>
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full flex items-center justify-center space-x-2 text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-600">
                        <FaSignInAlt />
                        <span>Login</span>
                      </button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <button className="w-full bg-gradient-to-r from-rose-500 to-orange-500 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2">
                        <FaUserPlus />
                        <span>Sign Up</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
