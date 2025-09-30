import React from "react";
import ProgressBar from "@/components/ProgressBar";

const HeadLIneOfCourse = ({name,description }) => {
  return (
    <div className="mb-5 p-3">
      <h1 className="text-5xl font-semibold">{name}</h1>
      <p className="pt-2 font-normal text-gray-300 tracking-tighter">
        {description}
      </p>
    </div>
  );
};

export default HeadLIneOfCourse;
