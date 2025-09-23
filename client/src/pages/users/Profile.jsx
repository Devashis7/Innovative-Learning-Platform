
import React, { useContext, useState, useEffect } from "react";
import Layout from "@/components/our components/layout";
import ProfileCard from "@/components/our components/ProfileCard";
import Progress from "@/components/our components/Progress";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(AuthContext); // Get user data from Context API
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="flex gap-10 w-full h-full">
        <div>
          <ProfileCard user={user} />
        </div>
        <div className="w-full">
          <Progress courses={courses} />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
