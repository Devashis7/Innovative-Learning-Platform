
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import TopicCard from "@/components/TopicCard";
import HeadLIneOfCourse from "@/components/HeadLIneOfCourse";
import axios from "axios";

const DSA = () => {
  const [course, setCourse] = useState(null);
  const [completedTopics, setCompletedTopics] = useState(0);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/courses/Data Structures and Algorithms"
        );
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, []);

  const totalTopics = course
    ? course.heading.reduce((acc, category) => acc + category.topics.length, 0)
    : 0;

  const updateProgress = (isChecked) => {
    setCompletedTopics((prev) => (isChecked ? prev + 1 : prev - 1));
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <HeadLIneOfCourse progress={(completedTopics / totalTopics) * 100} />
      <div className="text-white p-4">
        <TopicCard heading={course.heading} updateProgress={updateProgress} />
      </div>
    </Layout>
  );
};

export default DSA;
