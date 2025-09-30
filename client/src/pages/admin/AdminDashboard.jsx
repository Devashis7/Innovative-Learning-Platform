import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:3000/api/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(res.data.students);
      } catch (err) {
        console.error(
          "Error fetching students:",
          err.response?.data || err.message
        );
      }
    };

    if (user?.role === "admin") {
      fetchStudents();
    }
  }, [user]);

  // Function to return greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <AdminLayout>
      <main className="flex-1 p-6 bg-gray-900 overflow-auto">
        {/* Greeting and Summary Cards */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
          {/* Admin Greeting Card */}
          <div className="bg-gradient-to-br from-purple-500 to-green-600 text-white p-5 shadow rounded-xl">
            <h2 className="text-xl font-semibold">
              {getGreeting()}, {user?.name} 👋
            </h2>
            <p className="text-sm mt-1">Welcome to your dashboard</p>
            <p className="mt-2">📧 {user?.email}</p>
            <p>🛡️ {user?.role?.toUpperCase()}</p>
          </div>

          {/* Total Students Card */}
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-5 shadow rounded-xl flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-blue-800">
                Total Students
              </h3>
              <p className="text-3xl font-bold text-blue-700">
                {students.length}
              </p>
            </div>
            <span className="text-blue-600 text-4xl">🎓</span>
          </div>
        </div>

        {/* Student Table */}
        <h1 className="text-2xl font-bold mb-4 text-gray-100">All Students</h1>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-xl overflow-hidden">
              <thead className="bg-gray-100 text-gray-900 uppercase text-sm">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{student.name}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3 capitalize">{student.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
