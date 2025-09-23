import React from "react";

const Card2 = () => {
  return (
    <div className="min-w-72 w-72 min-h-64 h-64  p-5 bg-[#1e2a44] text-white rounded-lg shadow-lg hover:border transition-all ">
      <div className="min-w-60 w-60 min-h-52 h-52 flex justify-center items-center bg-[#101623] rounded-lg">
        <div className=" flex flex-col gap-5">
          <span className="text-4xl font-semibold">0k+</span>
          <span>Facebook</span> <span></span>
        </div>
      </div>
    </div>
  );
};

export default Card2;
