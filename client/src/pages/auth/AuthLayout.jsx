import React from 'react';
import NavBar from '../../components/NavBar';
import { useTheme } from '../../context/ThemeContext';

const AuthLayout = ({ children }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <NavBar />
      <main className="px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;