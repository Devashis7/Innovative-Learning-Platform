import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Update localStorage and apply theme to document
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Apply theme to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Dark mode colors
      dark: {
        primary: 'from-[#111827] via-[#1f2937] to-[#111827]',
        secondary: '#1f2937',
        accent: 'from-rose-500 to-orange-500',
        text: {
          primary: 'text-white',
          secondary: 'text-gray-300',
          muted: 'text-gray-400'
        },
        background: {
          primary: 'bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827]',
          secondary: 'bg-[#1f2937]',
          card: 'bg-[#1f2937]',
          hover: 'hover:bg-gray-700/50'
        },
        border: 'border-gray-700'
      },
      // Light mode colors
      light: {
        primary: 'from-gray-50 via-white to-gray-100',
        secondary: '#ffffff',
        accent: 'from-rose-500 to-orange-500',
        text: {
          primary: 'text-gray-900',
          secondary: 'text-gray-700',
          muted: 'text-gray-600'
        },
        background: {
          primary: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
          secondary: 'bg-white',
          card: 'bg-white',
          hover: 'hover:bg-gray-100'
        },
        border: 'border-gray-200'
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};