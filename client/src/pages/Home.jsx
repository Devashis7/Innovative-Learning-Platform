
import NavBar from "@/components/our components/NavBar";
import React, { useState, useEffect } from "react";
import logo from "/logo.png";
import Button from "@/components/our components/Button";
import Card from "@/components/our components/Card";
import Card2 from "@/components/our components/card2";
import FeatureCard from "@/components/our components/FeatureCard ";
import features from "@/utils/features";
import { motion } from "framer-motion"; // Import Framer Motion
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <motion.div
      className="bg-[#111827]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Navbar */}
      <motion.section
        className="w-10/12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <NavBar />
      </motion.section>

      {/* Main Content */}
      <main className="w-10/12 mx-auto h-full p-10">
        {/* Hero Section */}
        <motion.section
          className="mt-20 p-5 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="pt-20 text-center">
            <motion.h1
              className="text-5xl font-bold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Your Ultimate{" "}
              <span className="text-rose-600 underline">Engineer Life</span>{" "}
              Preparation <span className="text-orange-500">Hub</span>!
            </motion.h1>
            <p className="p-4 text-gray-500">
              Engineer Life is innovation, precision, creativity, leadership,
              problem-solving, exploration, and success combined.
            </p>
          </div>
        </motion.section>

        {/* Semester Cards Section */}
        <motion.section
          className="pt-24 w-10/12 mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="p-2 gap-10 flex justify-between flex-wrap">
            {courses.map((value, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card item={value} ItemIndex={index} />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Section */}
        <motion.section
          className="mt-60 text-center w-11/12 mx-auto"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl font-bold text-white">
            Connect with our community
          </h1>
          <div className="mt-36 flex items-center justify-between">
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card2 />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="w-10/12 mx-auto mt-60"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="py-16">
            <h1 className="text-4xl text-white font-bold text-center mb-8">
              Why choose us?
            </h1>
            <p className="text-gray-400 text-center mb-12">
              Unlock Your Potential with Our Comprehensive Learning Approach
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-5xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <FeatureCard
                    number={feature.number}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <footer className="bg-gray-400 text-white text-center py-4 mt-8">
        <p>
          &copy; {new Date().getFullYear()} Nexus.com,All rights
          reserved.
        </p>
      </footer>
    </motion.div>
  );
};

export default Home;
