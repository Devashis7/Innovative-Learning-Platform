import HeadLIneOfCourse from "@/components/HeadLIneofCourse";
import Layout from "@/components/layout";
import TopicCard from "@/components/TopicCard";
import React, { useState } from "react";
import systemDesign from "@/utils/operatingSystem";

const SystemDesign = () => {
  const courses = JSON.parse(localStorage.getItem("courses")) || []
  const totalTopics = systemDesign.reduce(
    (acc, category) => acc + category.topics.length,
    0
  );
  const [completedTopics, setCompletedTopics] = useState(0);

  const updateProgress = (isChecked) => {
    setCompletedTopics((prev) => (isChecked ? prev + 1 : prev - 1));
  };
  return (
    <Layout>
      <HeadLIneOfCourse progress={(completedTopics / totalTopics) * 100} />
      <div className=" text-white p-4">
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

export default SystemDesign;
