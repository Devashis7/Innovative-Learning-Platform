import axios from 'axios';

// API Base URL Configuration
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://innovative-learning-backend.onrender.com'  // Your Render backend URL
  : 'http://localhost:3000';

// Configure default axios instance
axios.defaults.baseURL = API_BASE_URL;

const API = axios.create({ 
  baseURL: `${API_BASE_URL}/api`
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Also configure global axios defaults
axios.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export const fetchCourses = () => API.get('/courses');
export const createCourse = (newCourse) => API.post('/courses', newCourse);
export const updateCourse = (id, updatedCourse) => API.put(`/courses/${id}`, updatedCourse);
export const deleteCourse = (id) => API.delete(`/courses/${id}`);

export default API;
