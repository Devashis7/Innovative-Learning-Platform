import React, { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import NavBar from '@/components/NavBar';
import ProfileCard from '@/components/ProfileCard';

const ProfilePage = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
            <ProfileCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
