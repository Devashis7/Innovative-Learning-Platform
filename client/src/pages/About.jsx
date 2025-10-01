import React from "react";
import { motion } from "framer-motion";
import { 
  FaRocket, 
  FaUsers, 
  FaGraduationCap, 
  FaLightbulb,
  FaChartLine,
  FaTrophy,
  FaHeart,
  FaGlobe
} from "react-icons/fa";
import NavBar from "@/components/NavBar";
import { useTheme } from "@/context/ThemeContext";

const About = () => {
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;
  
  const stats = [
    { icon: FaGraduationCap, value: "15+", label: "Course Modules" },
    { icon: FaRocket, value: "MERN", label: "Tech Stack" },
    { icon: FaLightbulb, value: "2024", label: "Project Year" },
    { icon: FaUsers, value: "CSE", label: "Target Audience" }
  ];

  const values = [
    {
      icon: FaRocket,
      title: "Technical Innovation",
      description: "Leveraging modern MERN stack technologies to create a scalable and responsive learning platform with real-time features."
    },
    {
      icon: FaLightbulb,
      title: "Educational Focus",
      description: "Centralizing quality educational resources specifically designed for engineering students' learning patterns and needs."
    },
    {
      icon: FaUsers,
      title: "Student-Centric Design",
      description: "Built by a student, for students - understanding the real challenges and requirements of engineering education."
    },
    {
      icon: FaChartLine,
      title: "Practical Learning",
      description: "Combining theoretical knowledge with hands-on MERN stack development experience through this comprehensive project."
    }
  ];

  return (
    <div className={`${currentTheme.background.primary} min-h-screen transition-colors duration-300`}>
      {/* Navigation */}
      <div className="fixed top-0 w-full z-50">
        <NavBar />
      </div>

      {/* Hero Section */}
      <motion.section 
        className="pt-32 pb-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              className={`text-5xl md:text-6xl font-bold ${currentTheme.text.primary} mb-6`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              About 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"> This Project</span>
            </motion.h1>
            <motion.p 
              className={`text-xl ${currentTheme.text.secondary} max-w-3xl mx-auto leading-relaxed`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A comprehensive learning platform designed to centralize quality educational resources 
              for engineering students, making knowledge accessible and structured.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Project Story Section */}
      <motion.section 
        className={`py-20 px-4 ${isDarkMode ? 'bg-[#1f2937]/30' : 'bg-gray-50'}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-6`}>Project Genesis</h2>
              <p className={`text-lg ${currentTheme.text.secondary} mb-6 leading-relaxed`}>
                Developed by <strong>Devashis Kumar</strong>, a Computer Science Engineering student 
                at GIET University, Gunupur, Odisha (2022-26 batch), this platform was created 
                as a 3rd year Web Development project during the 7th semester.
              </p>
              <p className={`text-lg ${currentTheme.text.secondary} mb-6 leading-relaxed`}>
                Inspired by platforms like TakeUForward, this project addresses the need for 
                centralized, high-quality educational resources specifically tailored for 
                engineering students, making learning more structured and accessible.
              </p>
              <p className={`text-lg ${currentTheme.text.secondary} leading-relaxed`}>
                Built using the MERN stack (MongoDB, Express.js, React, Node.js), this platform 
                represents a comprehensive full-stack development journey, combining modern web 
                technologies with educational innovation.
              </p>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 p-8 rounded-2xl border border-rose-500/30">
                <FaGraduationCap className="text-6xl text-rose-500 mb-6" />
                <h3 className={`text-2xl font-bold ${currentTheme.text.primary} mb-4`}>Academic Vision</h3>
                <p className={`text-lg ${currentTheme.text.secondary} leading-relaxed`}>
                  To create a unified platform where engineering students can access structured 
                  learning paths, track their progress, and build practical skills through 
                  hands-on projects and comprehensive coursework.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Developer Profile Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Meet the Developer</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>The student behind this innovative learning platform</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center lg:text-left"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center lg:justify-start mb-8">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img 
                    src="/dev.jpg" 
                    alt="Devashis Kumar"
                    className="w-48 h-48 rounded-full object-cover border-4 border-rose-500/30 shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500/20 to-orange-500/20"></div>
                </motion.div>
              </div>
              
              <h3 className={`text-3xl font-bold ${currentTheme.text.primary} mb-2`}>Devashis Kumar</h3>
              <p className={`text-xl text-rose-500 font-semibold mb-4`}>Computer Science Engineering Student</p>
              <p className={`${currentTheme.text.secondary} text-lg mb-6`}>
                GIET University, Gunupur, Odisha<br />
                B.Tech CSE (2022-2026) • Currently in 7th Semester
              </p>
              
              <div className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border}`}>
                <h4 className={`text-lg font-semibold ${currentTheme.text.primary} mb-3`}>Academic Journey</h4>
                <p className={`${currentTheme.text.secondary} leading-relaxed`}>
                  A passionate computer science student with a keen interest in full-stack web development. 
                  Currently pursuing B.Tech in Computer Science Engineering, focusing on modern web technologies 
                  and building practical solutions for real-world problems.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 p-8 rounded-2xl border border-rose-500/30">
                  <FaLightbulb className="text-4xl text-rose-500 mb-4" />
                  <h3 className={`text-2xl font-bold ${currentTheme.text.primary} mb-4`}>Project Inspiration</h3>
                  <p className={`text-lg ${currentTheme.text.secondary} leading-relaxed mb-4`}>
                    Inspired by platforms like TakeUForward, this project aims to create a centralized 
                    resource hub for engineering students, making quality education accessible and organized.
                  </p>
                  <p className={`${currentTheme.text.secondary} leading-relaxed`}>
                    Built as a 3rd year Web Development project to practice and showcase MERN stack skills 
                    while solving real problems faced by engineering students.
                  </p>
                </div>
                
                <div className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border}`}>
                  <FaRocket className="text-3xl text-rose-500 mb-4" />
                  <h4 className={`text-xl font-semibold ${currentTheme.text.primary} mb-3`}>Technical Skills Developed</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-rose-500/10 rounded-lg">
                      <span className={`${currentTheme.text.primary} font-medium`}>React.js</span>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                      <span className={`${currentTheme.text.primary} font-medium`}>Node.js</span>
                    </div>
                    <div className="text-center p-3 bg-rose-500/10 rounded-lg">
                      <span className={`${currentTheme.text.primary} font-medium`}>MongoDB</span>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                      <span className={`${currentTheme.text.primary} font-medium`}>Express.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className={`py-20 px-4 ${isDarkMode ? 'bg-[#1f2937]/30' : 'bg-gray-50'}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Project Highlights</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>Key metrics and achievements of this academic project</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="text-5xl text-rose-500 mx-auto mb-4" />
                <div className={`text-4xl font-bold ${currentTheme.text.primary} mb-2`}>{stat.value}</div>
                <div className={`${currentTheme.text.muted} text-lg`}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology Stack Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Technology Stack</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>Modern web technologies used in this project</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border} text-center`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">⚛️</div>
              <h3 className={`text-lg font-bold ${currentTheme.text.primary} mb-2`}>React.js</h3>
              <p className={`${currentTheme.text.secondary} text-sm`}>Frontend library for building interactive user interfaces</p>
            </motion.div>
            
            <motion.div
              className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border} text-center`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">🟢</div>
              <h3 className={`text-lg font-bold ${currentTheme.text.primary} mb-2`}>Node.js</h3>
              <p className={`${currentTheme.text.secondary} text-sm`}>JavaScript runtime for building scalable backend services</p>
            </motion.div>
            
            <motion.div
              className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border} text-center`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className={`text-lg font-bold ${currentTheme.text.primary} mb-2`}>Express.js</h3>
              <p className={`${currentTheme.text.secondary} text-sm`}>Web framework for creating robust APIs and server logic</p>
            </motion.div>
            
            <motion.div
              className={`${currentTheme.background.card} p-6 rounded-xl border ${currentTheme.border} text-center`}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-4">🍃</div>
              <h3 className={`text-lg font-bold ${currentTheme.text.primary} mb-2`}>MongoDB</h3>
              <p className={`${currentTheme.text.secondary} text-sm`}>NoSQL database for flexible and scalable data storage</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section 
        className={`py-20 px-4 ${isDarkMode ? 'bg-[#1f2937]/30' : 'bg-gray-50'}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Project Principles</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>The core values and learning objectives behind this development</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`${currentTheme.background.card} p-8 rounded-xl border ${currentTheme.border} hover:border-rose-500/50 transition-all duration-300 text-center`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <value.icon className="text-4xl text-rose-500 mx-auto mb-6" />
                <h3 className={`text-xl font-bold ${currentTheme.text.primary} mb-4`}>{value.title}</h3>
                <p className={`${currentTheme.text.secondary} leading-relaxed`}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Developer Info & Future Plans Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-gradient-to-r from-rose-500/20 to-orange-500/20 p-12 rounded-2xl border border-rose-500/30"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <FaRocket className="text-5xl text-rose-500 mx-auto mb-6" />
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Future Enhancements</h2>
            <p className={`text-xl ${currentTheme.text.secondary} mb-8`}>
              This project continues to evolve with plans for AI-powered recommendations, 
              interactive coding environments, peer collaboration features, and mobile app development.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className={`${currentTheme.background.card} p-4 rounded-lg border ${currentTheme.border}`}>
                <h4 className={`font-semibold ${currentTheme.text.primary} mb-2`}>🎯 Academic Goals</h4>
                <p className={`${currentTheme.text.secondary} text-sm`}>Enhance full-stack development skills and create a meaningful impact on student learning</p>
              </div>
              <div className={`${currentTheme.background.card} p-4 rounded-lg border ${currentTheme.border}`}>
                <h4 className={`font-semibold ${currentTheme.text.primary} mb-2`}>🚀 Tech Skills</h4>
                <p className={`${currentTheme.text.secondary} text-sm`}>MERN Stack, Authentication, Database Design, API Development, Responsive UI/UX</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
