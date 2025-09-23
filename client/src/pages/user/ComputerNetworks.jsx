import HeadLIneOfCourse from "@/components/our components/HeadLIneofCourse";
import Layout from "@/components/our components/layout";
import TopicCard from "@/components/our components/TopicCard";
import React, { useEffect, useState } from "react";
import computerNetwork from "@/utils/computerNetwork";
// const courses = [
//   {
//     name: "JavaScript Essentials",
//     description: "Learn the fundamentals of JavaScript",
//     heading: [
//       {
//         name: "Basics",
//         topics: [
//           {
//             title: "Variables and Data Types",
//             youtubeLink: "https://youtu.be/js-1",
//           },
//           {
//             title: "Functions and Scope",
//             youtubeLink: "https://youtu.be/js-2",
//           },
//         ],
//       },
//       {
//         name: "Control Flow",
//         topics: [
//           { title: "If-Else & Switch", youtubeLink: "https://youtu.be/js-3" },
//           { title: "Loops", youtubeLink: "https://youtu.be/js-4" },
//         ],
//       },
//       {
//         name: "Advanced",
//         topics: [
//           { title: "Arrays & Objects", youtubeLink: "https://youtu.be/js-5" },
//           {
//             title: "Callbacks & Promises",
//             youtubeLink: "https://youtu.be/js-6",
//           },
//         ],
//       },
//     ],
//   },
// ];


const courses = JSON.parse(localStorage.getItem("courses")) || []
console.log(courses);

const ComputerNetworks = () => {
  const totalTopics = computerNetwork.reduce(
    (acc, category) => acc + category.topics.length,
    0
  );
  const [completedTopics, setCompletedTopics] = useState(0);

  const updateProgress = (isChecked) => {
    setCompletedTopics((prev) => (isChecked ? prev + 1 : prev - 1));
  };

  return (
    <Layout>
      <HeadLIneOfCourse progress={(completedTopics / totalTopics) * 100}  />
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

export default ComputerNetworks;
