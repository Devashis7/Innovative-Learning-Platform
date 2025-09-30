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
    { icon: FaUsers, value: "10,000+", label: "Happy Students" },
    { icon: FaGraduationCap, value: "50+", label: "Expert Courses" },
    { icon: FaTrophy, value: "95%", label: "Success Rate" },
    { icon: FaGlobe, value: "25+", label: "Countries" }
  ];

  const values = [
    {
      icon: FaRocket,
      title: "Innovation",
      description: "We constantly evolve our platform with cutting-edge technology and teaching methods to provide the best learning experience."
    },
    {
      icon: FaHeart,
      title: "Passion",
      description: "Our team is passionate about education and dedicated to helping every student achieve their career goals."
    },
    {
      icon: FaLightbulb,
      title: "Excellence",
      description: "We maintain the highest standards in course quality, instructor expertise, and student support."
    },
    {
      icon: FaUsers,
      title: "Community",
      description: "We foster a supportive learning community where students and instructors collaborate and grow together."
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"> Our Mission</span>
            </motion.h1>
            <motion.p 
              className={`text-xl ${currentTheme.text.secondary} max-w-3xl mx-auto leading-relaxed`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We're on a mission to democratize quality education and empower engineers worldwide 
              with the skills they need to build the future.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
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
              <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-6`}>Our Story</h2>
              <p className={`text-lg ${currentTheme.text.secondary} mb-6 leading-relaxed`}>
                Founded in 2020 by a team of passionate educators and industry experts, 
                Innovative Learning Platform was born from a simple observation: traditional 
                education wasn't keeping pace with the rapidly evolving tech industry.
              </p>
              <p className={`text-lg ${currentTheme.text.secondary} mb-6 leading-relaxed`}>
                We set out to bridge this gap by creating a platform that combines theoretical 
                knowledge with hands-on practice, mentorship from industry professionals, and 
                a supportive community of learners.
              </p>
              <p className={`text-lg ${currentTheme.text.secondary} leading-relaxed`}>
                Today, we're proud to have helped thousands of engineers advance their careers 
                and build innovative solutions that shape our world.
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
                <FaRocket className="text-6xl text-rose-500 mb-6" />
                <h3 className={`text-2xl font-bold ${currentTheme.text.primary} mb-4`}>Our Vision</h3>
                <p className={`text-lg ${currentTheme.text.secondary} leading-relaxed`}>
                  To become the world's leading platform for engineering education, 
                  empowering millions of learners to build innovative solutions and 
                  advance their careers in technology.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Our Impact</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>Numbers that speak to our commitment to excellence</p>
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
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Our Values</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>The principles that guide everything we do</p>
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

      {/* Team CTA Section */}
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
            <FaUsers className="text-5xl text-rose-500 mx-auto mb-6" />
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Join Our Community</h2>
            <p className={`text-xl ${currentTheme.text.secondary} mb-8`}>
              Ready to start your learning journey? Join thousands of engineers who are already 
              advancing their careers with us.
            </p>
            <motion.button 
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
