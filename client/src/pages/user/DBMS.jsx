
import React, { useState } from "react";
import HeadLIneOfCourse from "@/components/our components/HeadLIneofCourse";
import Layout from "@/components/our components/layout";
import TopicCard from "@/components/our components/TopicCard";
import databaseManagementSystem from "@/utils/databaseManagementSystem";


const DBMS = () => {
  const courses = JSON.parse(localStorage.getItem("courses")) || []
console.log(courses);
  const totalTopics = databaseManagementSystem.reduce((acc, category) => acc + category.topics.length, 0);
  const [completedTopics, setCompletedTopics] = useState(0);

  const updateProgress = (isChecked) => {
    setCompletedTopics((prev) => (isChecked ? prev + 1 : prev - 1));
  };

  return (
    <Layout>
      <HeadLIneOfCourse progress={(completedTopics / totalTopics) * 100} />
      <div className="text-white p-4">
        {courses.map((OneCourse, index) => (
          <div key={index} className="mb-4">
           <TopicCard
              heading={OneCourse.heading}
              updateProgress={updateProgress}
            />{" "}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DBMS;

