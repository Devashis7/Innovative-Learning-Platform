import React from "react";
import semestersData from "@/utils/data";
import YourProgress from "./YourProgress";

const ProgressCard = () => {
  return (
    <div className="w-full">
      <div className=" w-full  mt-10 text-white border  rounded-lg h-full shadow-lg">
        <p className="p-5 border-b text-3xl font-semibold">Progress</p>

        <div className="p-3 flex flex-wrap gap-10 justify-around mt-8">
          {semestersData.map((value, index) => {
            return <YourProgress value={value}></YourProgress>;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;
