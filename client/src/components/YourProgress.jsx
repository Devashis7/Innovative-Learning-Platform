import React from "react";
import { LuExternalLink } from "react-icons/lu";
import { Link } from "react-router-dom";

const YourProgress = ({ value }) => {
  return (
    <div className="border rounded-lg flex items-center flex-col">
      <div className=" h-[180px] w-[200px] rounded-md flex justify-center items-center">
        <p>60%</p>
      </div>
      <p className="p-2 rounded-lg text-center flex   gap-2">
        {value.short_name}
        <Link to={value.path}>
          <LuExternalLink size={20} className=" text-rose-600" />
        </Link>
      </p>
    </div>
  );
};

export default YourProgress;
