import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ProfilePage from "./pages/user/ProfilePage";
import DSA from "./pages/user/DSA";
import OperatingSystems from "./pages/user/OperatingSystems";
import DBMS from "./pages/user/DBMS";
import ComputerNetworks from "./pages/user/ComputerNetworks";
import SystemDesign from "./pages/user/SystemDesign";
import OOPs from "./pages/user/OOPs";
import PrivateRoute from "./components/private/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddCourse2 from "./pages/admin/AddCourse2";
import CourseDetail from "./pages/user/CourseDetail";

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
