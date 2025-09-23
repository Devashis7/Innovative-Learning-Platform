import React from "react";
import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <Link
          to="/admin-dashboard"
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          All Students
        </Link>
        <Link
          to="/admin/add-course"
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
          Add Course
        </Link>
        <Link
          to="/"
          className="block w-full text-left hover:bg-gray-700 p-2 rounded"
        >
        Home
        </Link>
      </aside>


      <main className="flex-1 p-6 bg-gray-900 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
