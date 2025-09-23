import React, { useContext } from "react";
import Layout from "@/components/our components/layout";
import ProfileCard from "@/components/our components/ProfileCard";
import ProgressCard from "@/components/our components/ProgressCard";
import { AuthContext } from "../../context/AuthContext";

const ProfilePage = () => {
  
  const { user } = useContext(AuthContext); // Get user data from Context API

  return (
    <Layout>
      <div className="flex gap-10 w-full h-full">
        <div>
          <ProfileCard user={user} />
        </div>
        <div className="w-full">
          {/* <ProgressCard user={user} /> */}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
