import React from "react";
import NavBar from "./NavBar";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import semestersData from "@/utils/data";
import LayoutSideCard from "./LayoutSideCard";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const courses = JSON.parse(localStorage.getItem("courses")) || []


  return (
    <div>
      <NavBar></NavBar>
      <div
        className="
       flex bg-[#111827] text-white min-h-screen "
      >
        <aside className="w-[270px]  p-1  z-0 border-r-[0.5px] h-full  pt-10 fixed left-0 top-20">
          <div className="w-full flex flex-col gap-4">
            <Link to="/profile">
              <div
                className={`flex gap-4 items-center w-full ${
                  pathname === "/profile" ? " bg-rose-500  " : ""
                } p-3 rounded-md`}
              >
                <FaRegUserCircle size={25} />
                <p className=" rounded-lg">Profile</p>
              </div>
            </Link>
            <hr className="bg-rose-300 rounded-2xl h-1" />
          </div>

          <div className="mt-4 space-y-2">
            {courses.map((items, index) => {
              return <LayoutSideCard  key={index} item={items} itemIndex={index} />;
            })}
          </div>
        </aside>
        <div className="w-full ml-72  mt-16 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
