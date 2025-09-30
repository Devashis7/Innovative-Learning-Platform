import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CourseProvider } from './context/CourseContext';

import PrivateRoute from './components/private/PrivateRoute';
import AdminRoute from './components/private/AdminRoute';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ProfilePage from './pages/Profile';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import CourseManagement from './pages/admin/CourseManagement';
import UserManagement from './pages/admin/UserManagement';
import CourseDetails from './pages/courses/CourseDetails';
import SubjectExplorer from './pages/SubjectExplorer';
import SubjectLearning from './pages/SubjectLearning';

const App = () => {
  return (
    <ThemeProvider>
      <CourseProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/course/:id' element={<CourseDetails />} />

          {/* Auth Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />

          {/* Student Routes */}
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          {/* Redirect old student dashboard route */}
          <Route path='/student/dashboard' element={<Navigate to="/dashboard" replace />} />
          <Route
            path='/subjects'
            element={
              <PrivateRoute>
                <SubjectExplorer />
              </PrivateRoute>
            }
          />
          <Route
            path='/subject/:id'
            element={
              <PrivateRoute>
                <SubjectLearning />
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path='/admin/dashboard'
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          {/* Redirect admin-dashboard to admin/dashboard */}
          <Route path='/admin-dashboard' element={<Navigate to="/admin/dashboard" replace />} />
          <Route
            path='/admin/courses'
            element={
              <AdminRoute>
                <CourseManagement />
              </AdminRoute>
            }
          />
          <Route
            path='/admin/users'
            element={
              <AdminRoute>
                <UserManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </CourseProvider>
    </ThemeProvider>
  );
};

export default App;
