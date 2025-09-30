import React from "react";
import { Link } from "react-router-dom";
import Chat from "../../components/Chat";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 space-y-4">
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

      {/* Main Content & Chat */}
      <main className="flex-1 flex p-6 overflow-auto">
        <div className="flex-1 ">{children}</div>
        <div className="w-1/3 ml-6">
          <Chat />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
