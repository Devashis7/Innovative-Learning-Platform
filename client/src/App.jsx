import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfilePage from "./pages/user/ProfilePage";

import PrivateRoute from "./components/private/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse2 from "./pages/admin/AddCourse2";
import CourseDetail from "./pages/user/CourseDetail";



const App = () => {
   
   
  const courses = JSON.parse(localStorage.getItem("courses")) || []
  return (
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
            <AddCourse2 />
          </PrivateRoute>
        }
      />

      {/* Protected Profile Page */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Home coursesData={courses}/>} />
      <Route path="/course/:id" element={<CourseDetail courses={courses} />} />
    </Routes>
  );
};

export default App;
