import HeadLIneOfCourse from "@/components/our components/HeadLIneOfCourse";
import Layout from "@/components/our components/layout";
import ProgressBar from "@/components/our components/ProgressBar";
import TopicCard from "@/components/our components/TopicCard";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CourseDetail = ({ courses }) => {
  const { id } = useParams();
  const selectedCourse = courses[id - 1];
  const [progress, setProgress] = useState(0);

  const name = selectedCourse.name;
  const description = selectedCourse.description;

  // ✅ Calculate overall progress here
  useEffect(() => {
    let total = 0;
    let completed = 0;

    selectedCourse.heading.forEach((head) => {
      head.topics?.forEach((topic) => {
        total++;
        if (topic.completed) completed++;
      });
    });

    const percentage = total ? (completed / total) * 100 : 0;
    setProgress(Math.round(percentage));
  }, [selectedCourse]);

  return (
    <Layout>
      <HeadLIneOfCourse name={name} description={description} />

    

      <div className="text-white p-4">
        {selectedCourse.heading.map((headingObj, index) => (
          <div key={index} className="mb-4">
            <TopicCard
              heading={[headingObj]}
              selectedTopics={headingObj.topics || []}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default CourseDetail;
