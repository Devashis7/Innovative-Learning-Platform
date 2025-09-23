
import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "./AdminLayout";
import { AuthContext } from "@/context/AuthContext";
import axios from "axios"; // Using axios for API calls

function AddCourse2() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_link: "",
    short_description: "",
    short_name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editCourseId, setEditCourseId] = useState(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);
  const [newHeading, setNewHeading] = useState("");
  const [editingHeadingIndex, setEditingHeadingIndex] = useState(null);
  const [editedHeadingName, setEditedHeadingName] = useState("");
  const [newTopic, setNewTopic] = useState({ title: "", youtubeLink: "" });
  const [editingTopic, setEditingTopic] = useState({
    headingIndex: null,
    topicIndex: null,
    title: "",
    youtubeLink: "",
  });

  const API_URL = "http://localhost:5000/api/courses";

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_URL);
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Add a new course
  const handleAdd = async () => {
    if (!formData.name || !formData.description)
      return alert("All fields required!");
    try {
      const response = await axios.post(API_URL, { ...formData, heading: [] });
      setCourses((prev) => [...prev, response.data.data]);
      setFormData({
        name: "",
        description: "",
        image_link: "",
        short_description: "",
        short_name: "",
      });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  // Delete a course
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`${API_URL}/${courseId}`);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Set form for editing
  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      description: course.description,
      image_link: course.image_link,
      short_description: course.short_description,
      short_name: course.short_name,
    });
    setIsEditing(true);
    setEditCourseId(course._id);
  };

  // Update a course
  const handleUpdate = async () => {
    if (!editCourseId) return;
    try {
      const response = await axios.put(`${API_URL}/${editCourseId}`, formData);
      const updatedCourses = courses.map((course) =>
        course._id === editCourseId ? response.data.data : course
      );
      setCourses(updatedCourses);
      setFormData({
        name: "",
        description: "",
        image_link: "",
        short_description: "",
        short_name: "",
      });
      setIsEditing(false);
      setEditCourseId(null);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Update course with new heading/topic data
  const updateCourseOnBackend = async (updatedCourse) => {
    try {
      const response = await axios.put(`${API_URL}/${updatedCourse._id}`, updatedCourse);
      const updatedCourses = courses.map((course) =>
        course._id === updatedCourse._id ? response.data.data : course
      );
      setCourses(updatedCourses);
      return response.data.data;
    } catch (error) {
      console.error("Error updating course details:", error);
    }
  };

  // Add a heading
  const addHeading = async () => {
    if (!newHeading || selectedCourseIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading.push({ name: newHeading, topics: [] });
    await updateCourseOnBackend(courseToUpdate);
    setNewHeading("");
  };

  // Delete a heading
  const deleteHeading = async (headingIndex) => {
    if (selectedCourseIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading.splice(headingIndex, 1);
    await updateCourseOnBackend(courseToUpdate);
  };
  
  const editHeading = (headingIndex) => {
    setEditingHeadingIndex(headingIndex);
    setEditedHeadingName(
      courses[selectedCourseIndex].heading[headingIndex].name
    );
  };

  const saveEditedHeading = async () => {
    if (selectedCourseIndex === null || editingHeadingIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading[editingHeadingIndex].name = editedHeadingName;
    await updateCourseOnBackend(courseToUpdate);
    setEditingHeadingIndex(null);
    setEditedHeadingName("");
  };
  
  const cancelEditHeading = () => {
    setEditingHeadingIndex(null);
    setEditedHeadingName("");
  };

  const addTopic = async (headingIndex) => {
    if (!newTopic.title || !newTopic.youtubeLink || selectedCourseIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading[headingIndex].topics.push({ ...newTopic });
    await updateCourseOnBackend(courseToUpdate);
    setNewTopic({ title: "", youtubeLink: "" });
  };
  
  const deleteTopic = async (headingIndex, topicIndex) => {
    if (selectedCourseIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading[headingIndex].topics.splice(topicIndex, 1);
    await updateCourseOnBackend(courseToUpdate);
  };
  
  const startEditTopic = (headingIndex, topicIndex) => {
    const topic = courses[selectedCourseIndex].heading[headingIndex].topics[topicIndex];
    setEditingTopic({
      headingIndex,
      topicIndex,
      title: topic.title,
      youtubeLink: topic.youtubeLink,
    });
  };

  const saveEditTopic = async () => {
    const { headingIndex, topicIndex, title, youtubeLink } = editingTopic;
    if (selectedCourseIndex === null) return;
    const courseToUpdate = { ...courses[selectedCourseIndex] };
    courseToUpdate.heading[headingIndex].topics[topicIndex] = { title, youtubeLink };
    await updateCourseOnBackend(courseToUpdate);
    setEditingTopic({ headingIndex: null, topicIndex: null, title: "", youtubeLink: "" });
  };

  const cancelEditTopic = () => {
    setEditingTopic({ headingIndex: null, topicIndex: null, title: "", youtubeLink: "" });
  };

  const { user } = useContext(AuthContext);
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl mx-auto bg-[#111827] min-h-screen rounded-xl shadow-inner text-white">
        <h1 className="text-3xl font-bold mb-6">📘 Course Dashboard</h1>

        {/* Admin Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 text-white p-5 shadow rounded-xl">
            <h2 className="text-xl font-semibold">
              {getGreeting()}, {user?.name} 👋
            </h2>
            <p className="text-sm mt-1">Welcome to your dashboard</p>
            <p className="mt-2">📧 {user?.email}</p>
            <p>🛡️ {user?.role?.toUpperCase()}</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold">📚 Total Courses</h2>
            <p className="text-3xl font-bold">{courses.length}</p>
          </div>
        </div>

        {/* Add/Edit Course */}
        <div className="bg-gray-800 p-4 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {isEditing ? "Edit Course" : "Add Course"}
          </h2>
          <input
            name="name"
            placeholder="Course Name"
            value={formData.name}
            onChange={handleChange}
            className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
          />
          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
          />
          <input
            name="image_link"
            placeholder="Image URL"
            value={formData.image_link}
            onChange={handleChange}
            className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
          />
          <input
            name="short_description"
            placeholder="Short Description"
            value={formData.short_description}
            onChange={handleChange}
            className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
          />
          <input
            name="short_name"
            placeholder="Short Name"
            value={formData.short_name}
            onChange={handleChange}
            className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
          />
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-rose-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          )}
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, idx) => (
            <div key={course._id} className="bg-gray-800 p-4 rounded shadow">
              <h3 className="text-xl font-bold">{course.name}</h3>
              <p>{course.description}</p>
              <div className="flex gap-4 text-sm mt-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="text-yellow-400"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="text-red-500"
                >
                  🗑 Delete
                </button>
                <button
                  onClick={() => setSelectedCourseIndex(idx)}
                  className="text-blue-400"
                >
                  📂 View Headings
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Heading + Topics */}
        {selectedCourseIndex !== null && courses[selectedCourseIndex] && (
          <div className="mt-10 bg-gray-800 p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              🗂 Headings for "{courses[selectedCourseIndex].name}"
            </h2>
            <input
              value={newHeading}
              onChange={(e) => setNewHeading(e.target.value)}
              placeholder="New Heading Name"
              className="border bg-gray-700 border-gray-600 p-2 mb-2 w-full"
            />
            <button
              onClick={addHeading}
              className="bg-rose-600 text-white px-4 py-2 rounded mb-4"
            >
              ➕ Add Heading
            </button>

            {courses[selectedCourseIndex].heading.map((heading, hIdx) => (
              <div key={hIdx} className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  {editingHeadingIndex === hIdx ? (
                    <div>
                      <input
                        value={editedHeadingName}
                        onChange={(e) => setEditedHeadingName(e.target.value)}
                        className="border bg-gray-700 border-gray-600 p-1 flex-1 mr-2"
                      />
                      <div className=" space-x-3">
                        <button
                          onClick={saveEditedHeading}
                          className="text-green-500 text-sm"
                        >
                          ✅
                        </button>
                        <button
                          onClick={cancelEditHeading}
                          className="text-red-500 text-sm ml-1"
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold">{heading.name}</h3>
                      <div>
                        <button
                          onClick={() => editHeading(hIdx)}
                          className="text-yellow-400 text-sm mr-2"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteHeading(hIdx)}
                          className="text-red-500 text-sm"
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <table className="w-full border border-gray-700 text-sm mb-2">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="border border-gray-600 px-2 py-1 text-left">Title</th>
                      <th className="border border-gray-600 px-2 py-1 text-left">
                        YouTube Link
                      </th>
                      <th className="border border-gray-600 px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heading.topics.map((topic, tIdx) => (
                      <tr key={tIdx}>
                        {editingTopic.headingIndex === hIdx &&
                        editingTopic.topicIndex === tIdx ? (
                          <>
                            <td className="border border-gray-600 px-2 py-1">
                              <input
                                value={editingTopic.title}
                                onChange={(e) =>
                                  setEditingTopic({
                                    ...editingTopic,
                                    title: e.target.value,
                                  })
                                }
                                className="border bg-gray-700 border-gray-600 p-1 w-full"
                              />
                            </td>
                            <td className="border border-gray-600 px-2 py-1">
                              <input
                                value={editingTopic.youtubeLink}
                                onChange={(e) =>
                                  setEditingTopic({
                                    ...editingTopic,
                                    youtubeLink: e.target.value,
                                  })
                                }
                                className="border bg-gray-700 border-gray-600 p-1 w-full"
                              />
                            </td>
                            <td className="border border-gray-600 px-2 py-1 text-center space-x-4">
                              <button
                                onClick={saveEditTopic}
                                className="text-green-500 text-sm mr-1"
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEditTopic}
                                className="text-red-500 text-sm"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border border-gray-600 px-2 py-1">{topic.title}</td>
                            <td className="border border-gray-600 px-2 py-1 text-blue-400">
                              <a
                                href={topic.youtubeLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {topic.youtubeLink}
                              </a>
                            </td>
                            <td className="border border-gray-600 px-2 py-1 text-center space-x-4">
                              <button
                                onClick={() => startEditTopic(hIdx, tIdx)}
                                className="text-yellow-400 text-sm mr-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTopic(hIdx, tIdx)}
                                className="text-red-500 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex gap-2">
                  <input
                    placeholder="Topic Title"
                    value={newTopic.title}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, title: e.target.value })
                    }
                    className="border bg-gray-700 border-gray-600 p-1 flex-1"
                  />
                  <input
                    placeholder="YouTube Link"
                    value={newTopic.youtubeLink}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, youtubeLink: e.target.value })
                    }
                    className="border bg-gray-700 border-gray-600 p-1 flex-1"
                  />
                  <button
                    onClick={() => addTopic(hIdx)}
                    className="bg-rose-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Add Topic
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AddCourse2;
