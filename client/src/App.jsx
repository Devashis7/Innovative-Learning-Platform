import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfilePage from "./pages/users/Profile";
import StudentDashboard from "./pages/users/StudentDashboard";
import SubjectExplorer from "./pages/SubjectExplorer";
import SubjectLearning from "./pages/SubjectLearning";

import PrivateRoute from "./components/private/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourseManagement from "./pages/admin/CourseManagement";
import CourseDetail from "./pages/users/CourseDetail";
import { ThemeProvider } from "./context/ThemeContext";



const App = () => {
   
   
  const courses = JSON.parse(localStorage.getItem("courses")) || []
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* ✅ Admin Dashboard Route */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add-course"
          element={
            <PrivateRoute>
              <CourseManagement />
            </PrivateRoute>
          }
        />

        {/* Protected Student Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <PrivateRoute>
              <SubjectExplorer />
            </PrivateRoute>
          }
        />
        <Route
          path="/subject/:subjectId"
          element={
            <PrivateRoute>
              <SubjectLearning />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/" element={<Home coursesData={courses}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
