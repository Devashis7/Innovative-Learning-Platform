import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfilePage from "./pages/users/Profile";
import DSA from "./pages/courses/DSA";
import OperatingSystems from "./pages/courses/OperatingSystems";
import DBMS from "./pages/courses/DBMS";
import ComputerNetworks from "./pages/courses/ComputerNetworks";
import SystemDesign from "./pages/users/SystemDesign";
import OOPs from "./pages/courses/OOPs";
import PrivateRoute from "./components/private/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CourseManagement from "./pages/admin/CourseManagement";
import CourseDetail from "./pages/users/CourseDetail";

const App = () => {
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
            <CourseManagement />
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

      {/* Public Pages */}
      <Route path="/data-structures-and-algorithms" element={<DSA />} />
      <Route path="/Operating-systems" element={<OperatingSystems />} />
      <Route path="/database-management-systems" element={<DBMS />} />
      <Route path="/computer-networks" element={<ComputerNetworks />} />
      <Route path="/system-design" element={<SystemDesign />} />
      {/* <Route path="/:id" element={<OOPs />} /> */}
      <Route path="/" element={<Home />} />
      <Route path="/course/:id" element={<CourseDetail />} />
    </Routes>
  );
};

export default App;
