
import React, { useContext, useState } from "react";
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
  FaSignOutAlt,
  FaUserPlus,
  FaChevronDown,
  FaTachometerAlt,
  FaUsers
} from "react-icons/fa";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;

  // Dynamic navigation based on user authentication and role
  const getNavLinks = () => {
    if (user) {
      if (user.role === "admin") {
        // Admin navigation
        return [
          { name: "Admin Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
          { name: "Manage Courses", path: "/admin/courses", icon: FaBook },
          { name: "Manage Users", path: "/admin/users", icon: FaUsers },
          { name: "Student View", path: "/dashboard", icon: FaHome },
        ];
      } else {
        // Regular user navigation
        return [
          { name: "Dashboard", path: "/dashboard", icon: FaHome },
          { name: "Subjects", path: "/subjects", icon: FaBook },
          { name: "About", path: "/about", icon: FaGraduationCap },
        ];
      }
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
    <nav className={`${isDarkMode ? 'bg-gradient-to-r from-[#111827] via-[#1f2937] to-[#111827]' : 'bg-gradient-to-r from-white via-gray-50 to-white'} backdrop-blur-lg border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200'} shadow-xl sticky top-0 z-50`}>
      {/* Animated background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <FaGraduationCap className="text-3xl text-rose-500 group-hover:text-orange-500 transition-colors duration-300" />
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
                className={`relative flex items-center space-x-2 ${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} px-4 py-2 rounded-lg transition-all duration-300 group overflow-hidden`}
              >
                {/* Hover background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon with enhanced animation */}
                <div className="relative">
                  <link.icon className="text-sm group-hover:text-rose-500 group-hover:scale-110 transition-all duration-300" />
                </div>
                
                {/* Text with relative positioning */}
                <span className="font-medium relative z-10">{link.name}</span>
                
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-rose-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <button className={`relative ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50' : 'bg-gray-200 hover:bg-gray-300'} ${currentTheme.text.primary} px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 group overflow-hidden`}>
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <FaUser className="text-sm group-hover:text-rose-500 transition-colors duration-300 relative z-10" />
                    <span className="relative z-10">Profile</span>
                  </button>
                </Link>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 flex items-center space-x-2"
                >
                  <FaSignOutAlt className="text-sm" />
                  <span>Logout</span>
                </button>
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

          {/* Enhanced Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`relative ${currentTheme.text.secondary} ${isDarkMode ? 'hover:text-white hover:bg-gray-700/50' : 'hover:text-gray-900 hover:bg-gray-100'} p-3 rounded-lg transition-all duration-300 group overflow-hidden`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-orange-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon with animation */}
              <div className="relative z-10">
                {mobileMenuOpen ? (
                  <FaTimes className="text-xl group-hover:text-rose-500 group-hover:rotate-90 transition-all duration-300" />
                ) : (
                  <FaBars className="text-xl group-hover:text-rose-500 group-hover:scale-110 transition-all duration-300" />
                )}
              </div>
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
                    
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-3 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
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
