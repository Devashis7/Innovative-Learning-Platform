import React from 'react';
import NavBar from '@/components/NavBar';
import { useTheme } from '@/context/ThemeContext';

const AdminLayout = ({ children }) => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;

  return (
    <div className={`min-h-screen ${currentTheme.background.primary} transition-colors duration-300`}>
      {/* NavBar */}
      <NavBar />
      
      {/* Main Content */}
      <main className='pt-24 pb-12 px-4'>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
