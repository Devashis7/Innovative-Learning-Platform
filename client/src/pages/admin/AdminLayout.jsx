import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaTachometerAlt, FaBook, FaUsers, FaHome } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const commonClasses = 'flex items-center p-3 rounded-lg transition-colors';
  const activeClasses = 'bg-rose-600 text-white shadow-md';
  const inactiveClasses = 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700';

  return (
    <div className='flex h-screen bg-gray-100 dark:bg-gray-900'>
      {/* Sidebar */}
      <aside className='w-64 bg-white dark:bg-gray-800 shadow-lg'>
        <div className="p-6">
          <Link to="/" className='flex items-center gap-2'>
            <FaBook className="text-rose-600 text-3xl" />
            <span className='text-2xl font-bold text-gray-800 dark:text-white'>EduFlex</span>
          </Link>
        </div>

        <nav className='mt-6 px-4 space-y-2'>
          <NavLink
            to='/admin/dashboard'
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <FaTachometerAlt className='mr-3' />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to='/admin/courses'
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <FaBook className='mr-3' />
            <span>Courses</span>
          </NavLink>
          <NavLink
            to='/admin/users'
            className={({ isActive }) => `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`}
          >
            <FaUsers className='mr-3' />
            <span>Users</span>
          </NavLink>
        </nav>

        <div className='absolute bottom-0 w-full p-4'>
            <Link 
                to="/"
                className={`${commonClasses} ${inactiveClasses}`}>
                <FaHome className='mr-3' />
                <span>Back to Home</span>
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6 lg:p-10 overflow-auto'>{children}</main>
    </div>
  );
};

export default AdminLayout;
