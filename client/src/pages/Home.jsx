
import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { 
  FaGraduationCap, 
  FaUsers, 
  FaCertificate, 
  FaChartLine,
  FaPlayCircle,
  FaStar,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaRocket,
  FaTrophy
} from "react-icons/fa";
import Card from "@/components/common/Card";
import FeatureCard from "@/components/FeatureCard ";
import features from "@/utils/features";
import axios from "axios";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({
    students: 10000,
    courses: 50,
    instructors: 25,
    completionRate: 95
  });
  
  const { isDarkMode, colors } = useTheme();
  const currentTheme = isDarkMode ? colors.dark : colors.light;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses");
        setCourses(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "/testimonial1.jpg",
      text: "This platform transformed my engineering career. The structured approach and expert guidance helped me land my dream job."
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer",
      image: "/testimonial2.jpg", 
      text: "The courses are incredibly well-structured. I went from beginner to advanced in just 6 months."
    },
    {
      name: "Emily Davis",
      role: "Data Scientist at Microsoft",
      image: "/testimonial3.jpg",
      text: "Best investment I've made in my career. The community support and mentorship are outstanding."
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
        className="pt-24 pb-20 px-4 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-orange-500/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className={`text-6xl md:text-7xl font-bold ${currentTheme.text.primary} mb-6 leading-tight`}>
              Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500"> Engineering </span>
              Career
            </h1>
            <p className={`text-xl ${currentTheme.text.secondary} mb-8 max-w-3xl mx-auto leading-relaxed`}>
              Master cutting-edge technologies with expert-crafted courses, hands-on projects, 
              and personalized mentorship. Join thousands of engineers who've accelerated their careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <motion.button 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning Today <FaArrowRight />
                </motion.button>
              </Link>
              <motion.button 
                className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-600/20 transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPlayCircle /> Watch Demo
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className={`flex flex-wrap justify-center items-center gap-8 ${currentTheme.text.muted}`}>
              <div className="flex items-center gap-2">
                <FaUsers className="text-rose-500" />
                <span>10,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCertificate className="text-blue-500" />
                <span>Industry Recognized</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTrophy className="text-orange-500" />
                <span>Award Winning</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className={`py-20 ${isDarkMode ? 'bg-[#1f2937]/50' : 'bg-gray-100/50'}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FaUsers, value: "10,000+", label: "Active Students" },
              { icon: FaGraduationCap, value: "50+", label: "Expert Courses" },
              { icon: FaChartLine, value: "95%", label: "Success Rate" },
              { icon: FaCertificate, value: "5,000+", label: "Certificates Issued" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <stat.icon className="text-4xl text-rose-500 mx-auto mb-4" />
                <div className={`text-3xl font-bold ${currentTheme.text.primary} mb-2`}>{stat.value}</div>
                <div className={currentTheme.text.muted}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Courses */}
      {courses.length > 0 && (
        <motion.section 
          className="py-20 px-4"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Featured Courses</h2>
              <p className={`${currentTheme.text.muted} text-lg max-w-2xl mx-auto`}>
                Explore our most popular courses designed by industry experts to help you master in-demand skills
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 6).map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card item={course} ItemIndex={index} />
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/courses">
                <motion.button 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  View All Courses
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <motion.section 
        className={`py-20 px-4 ${isDarkMode ? 'bg-[#1f2937]/30' : 'bg-gray-50'}`}
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Why Choose Our Platform?</h2>
            <p className={`${currentTheme.text.muted} text-lg max-w-2xl mx-auto`}>
              Discover what makes our learning platform the preferred choice for ambitious engineers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 px-4"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>What Our Students Say</h2>
            <p className={`${currentTheme.text.muted} text-lg`}>Real stories from real students who transformed their careers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className={`${currentTheme.background.card} p-8 rounded-xl border ${currentTheme.border} hover:border-rose-500/50 transition-all duration-300`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FaQuoteLeft className="text-2xl text-rose-500 mb-4" />
                <p className={`${currentTheme.text.secondary} mb-6 leading-relaxed`}>{testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`${currentTheme.text.primary} font-semibold`}>{testimonial.name}</div>
                    <div className={`${currentTheme.text.muted} text-sm`}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>



      {/* CTA Section */}
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
            <h2 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>Ready to Launch Your Career?</h2>
            <p className={`text-xl ${currentTheme.text.secondary} mb-8`}>
              Join thousands of engineers who have transformed their careers with our expert-led courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <motion.button 
                  className="bg-gradient-to-r from-rose-500 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Journey Today
                </motion.button>
              </Link>
              <Link to="/courses">
                <motion.button 
                  className="border-2 border-rose-500 text-rose-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-rose-500 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-[#0f172a]' : 'bg-gray-100'} ${currentTheme.text.primary} py-16 px-4 border-t ${currentTheme.border}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <FaGraduationCap className="text-2xl text-rose-500" />
                <span className={`text-xl font-bold ${currentTheme.text.primary}`}>Innovative Learning Platform</span>
              </div>
              <p className={`${currentTheme.text.muted} mb-6 max-w-md`}>
                Empowering engineers worldwide with cutting-edge education, practical skills, 
                and career advancement opportunities.
              </p>
              <div className="flex gap-4">
                <FaLinkedin className="text-2xl text-blue-500 hover:text-blue-400 cursor-pointer transition-colors" />
                <FaTwitter className="text-2xl text-blue-400 hover:text-blue-300 cursor-pointer transition-colors" />
                <FaGithub className={`text-2xl ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} cursor-pointer transition-colors`} />
                <FaInstagram className="text-2xl text-pink-500 hover:text-pink-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text.primary}`}>Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Courses', 'Pricing', 'Blog', 'Career Support', 'Success Stories'].map((link) => (
                  <li key={link}>
                    <a href="#" className={`${currentTheme.text.muted} hover:text-rose-500 transition-colors`}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${currentTheme.text.primary}`}>Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-rose-500" />
                  <span className={currentTheme.text.muted}>support@innovativelearning.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaPhone className="text-rose-500" />
                  <span className={currentTheme.text.muted}>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-rose-500" />
                  <span className={currentTheme.text.muted}>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className={`border-t ${currentTheme.border} pt-8 flex flex-col md:flex-row justify-between items-center`}>
            <p className={`${currentTheme.text.muted} mb-4 md:mb-0`}>
              &copy; {new Date().getFullYear()} Innovative Learning Platform. All rights reserved.
            </p>
            <div className={`flex gap-6 text-sm ${currentTheme.text.muted}`}>
              <a href="#" className="hover:text-rose-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-rose-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-rose-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
