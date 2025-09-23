import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Button = ({ children,border }) => {
  return (
    <button className={`${border?"border":" bg-rose-600"} py-3 px-4 hover:bg-rose-700 rounded-full text-white`}>
      <div className=" flex items-center gap-2">
        {children}
        <FaArrowRight size={20} className="" />
      </div>
    </button>
  );
};

export default Button;
