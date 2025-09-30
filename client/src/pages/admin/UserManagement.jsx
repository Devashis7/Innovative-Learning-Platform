import React from 'react';
import AdminLayout from './AdminLayout';

const UserManagement = () => {
  return (
    <AdminLayout>
      <div className='text-gray-900 dark:text-white'>
        <h1 className='text-3xl font-bold mb-6'>User Management</h1>
        <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>All Users</h2>
            <p className='text-gray-500'>Coming soon: A table of all users with the ability to edit their roles and delete them.</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
