import React, { useState, useEffect, useContext } from "react";
import AdminLayout from "./AdminLayout";
import { AuthContext } from "@/context/AuthContext";

const initialCourses = [
  {
    id: "1",
    name: "Computer Network",
    image_link: "https://voip.csie.org/CN2020/images/CN.png",
    short_description: "Master the basics of Computer Network.",
    short_name:"",
    description:
      "Computer Networks is the study of systems that enable devices to communicate and share data efficiently over wired and wireless mediums.",
    heading: [
      {
        name: "Introduction",
        topics: [
          {
            title: "Basics of Computer Networks",
            youtubeLink: "https://youtu.be/VwN91x5i25g?feature=shared",
          },
          {
            title: "Types of Network",
            youtubeLink: "https://youtu.be/9BIN99rHOCQ?feature=shared",
          },
        ],
      },
      {
        name: "Network Architecture",
        topics: [
          {
            title: "Layered Architecture",
            youtubeLink: "https://youtu.be/FewtLNsjtRA?feature=shared",
          },
          {
            title: "Client Server Network",
            youtubeLink: "https://youtu.be/a5CgfS0Y4Uc?feature=shared",
          },
        ],
      },
      {
        name: "Network Topologies",
        topics: [
          {
            title: "Mesh Topology",
            youtubeLink: "https://youtu.be/uSKdjjw5zow?feature=shared",
          },
          {
            title: "Star Topology",
            youtubeLink: "https://youtu.be/uSKdjjw5zow?feature=shared",
          },
          {
            title: "Hybrid Topology",
            youtubeLink: "https://youtu.be/uSKdjjw5zow?feature=shared",
          },
        ],
      },
      {
        name: "Networking Devices",
        topics: [
          {
            title: "Routers",
            youtubeLink: "https://youtu.be/epdpVkoB9JM?feature=shared",
          },
          {
            title: "Switches",
            youtubeLink: "https://youtu.be/NZBuPfA6xZ8?feature=shared",
          },
        ],
      },
      {
        name: "Network Models",
        topics: [
          {
            title: "OSI Model",
            youtubeLink: "https://youtube.com/xyz1",
          },
          {
            title: "TCP/IP Model",
            youtubeLink: "https://youtube.com/xyz2",
          },
        ],
      },
      {
        name: "Data Link Layer",
        topics: [
          {
            title: "Framing",
            youtubeLink: "https://youtube.com/xyz1",
          },
          {
            title: "Error Detection",
            youtubeLink: "https://youtube.com/xyz2",
          },
          {
            title: "Flow Control",
            youtubeLink: "https://youtube.com/xyz2",
          },
        ],
      },
      {
        name: "Network Layer",
        topics: [
          {
            title: "IPv4 vs IPv6",
            youtubeLink: "https://youtube.com/xyz1",
          },
          {
            title: "Private vs Public IP addresses",
            youtubeLink: "https://youtube.com/xyz2",
          },
        ],
      },
      {
        name: "Subnetting",
        topics: [
          {
            title: "Subnetting basics",
            youtubeLink: "https://youtube.com/xyz1",
          },
          {
            title: "Variable Length Subnet Masking (VLSM)",
            youtubeLink: "https://youtube.com/xyz2",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Computer Organization Architecture",
    image_link: "https://play-lh.googleusercontent.com/fJbDbeQBAdodImZW3wURXBax6dVSSCig2BUg35RLAB26nJYwaveo3RvrhPib_nkRH7nn",
    short_description: "Study of computer components, structure, and functionality.",
    description:
      "Computer Organization and Architecture explores the design, structure, and operation of computer systems.",
    heading: [
      {
        name: "Introduction",
        topics: [
          {
            title: "Basics of Computer Organization",
            youtubeLink: "https://youtu.be/Mefcns2mkwY?feature=shared",
          },
          {
            title: "Difference between Computer Organization & Architecture",
            youtubeLink: "hhttps://youtu.be/XiF1onhCy8M?feature=shared",
          },
        ],
      },
      {
        name: "Processor Architecture",
        topics: [
          {
            title: "Von Neumann vs Harvard Architecture",
            youtubeLink: "https://youtu.be/YiZy6vfgtHU?feature=shared",
          },
          {
            title: "RISC vs CISC",
            youtubeLink: "https://youtu.be/bTCuFmY0sUg?feature=shared",
          },
        ],
      },
      {
        name: "Memory Organization",
        topics: [
          {
            title: "Cache Memory",
            youtubeLink: "https://youtu.be/Ez_kyBS-y5w?feature=shared",
          },
          {
            title: "Virtual Memory",
            youtubeLink: "https://youtu.be/8yO2FBBfaB0?feature=shared",
          },
        ],
      },
      {
        name: "Input Output System",
        topics: [
          {
            title: "I/O Interface",
            youtubeLink: "https://youtube.com/react1",
          },
          {
            title: "Interrupts and DMA",
            youtubeLink: "https://youtube.com/react2",
          },
        ],
      },
      {
        name: "Instruction Set Architecture",
        topics: [
          {
            title: "Types of Instruction Sets",
            youtubeLink: "https://youtube.com/react1",
          },
          {
            title: "Addressing Modes",
            youtubeLink: "https://youtube.com/react2",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Data Structures Algorithms",
    image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjj5OFZqwmQ4d-PTT8u-vCLoQm_aIFeoKuOQ&s",
    short_description: "Efficient problem-solving using structured data and algorithms.",
    description:
      "Study of organizing data and designing efficient algorithms to solve computational problems effectively.",
    heading: [
      {
        name: "Basics",
        topics: [
          {
            title: "Introduction to DSA",
            youtubeLink: "https://youtu.be/VTLCoHnyACE?feature=shared",
          },
          {
            title: "Complexity Analysis (Time and Space)",
            youtubeLink: "https://youtu.be/FPu9Uld7W-E?feature=shared",
          },
        ],
      },
      {
        name: "Arrays",
        topics: [
          {
            title: "Introduction to Arrays",
            youtubeLink: "https://youtu.be/08LWytp6PNI?feature=shared",
          },
          {
            title: "Searching Algorithms (Linear, Binary)",
            youtubeLink: "https://youtu.be/ZHCP9vFOJiU?feature=shared",
          },
          {
            title: "Sorting Algorithms (Bubble, Quick, Merge, Insertion, Selection)",
            youtubeLink: "https://youtu.be/1jCFUv-Xlqo?feature=shared2",
          },
        ],
      },
      {
        name: "LinkedList",
        topics: [
          {
            title: "Singly Linked List",
            youtubeLink: "https://youtube.com/node1",
          },
          {
            title: "Doubly Linked List",
            youtubeLink: "https://youtube.com/node2",
          },
          {
            title: "Circular Linked List",
            youtubeLink: "https://youtube.com/node2",
          },
        ],
      },
      {
        name: "Stacks & Queues",
        topics: [
          {
            title: "Stack Operations",
            youtubeLink: "https://youtu.be/7m1DMYAbdiY?feature=shared",
          },
          {
            title: "Queue Operations",
            youtubeLink: "https://youtu.be/zp6pBNbUB2U?feature=shared",
          },
          {
            title: "Priority Queue & Deque",
            youtubeLink: "hhttps://youtu.be/m9SVfOYTaBQ?feature=shared",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Database Management System",
    image_link: "https://images.tpointtech.com/fullformpages/images/dbms-full-form2.png",
    short_description: "NoSQL database fundamentals using MongoDB.",
    description:
      "Database Management System enables efficient data storage, retrieval, manipulation, and security while ensuring integrity, consistency, and accessibility.",
    heading: [
      {
        name: "Introduction",
        topics: [
          {
            title: "Database Basics",
            youtubeLink: "https://youtube.com/mongo1",
          },
          {
            title: "Types of Databases",
            youtubeLink: "https://youtube.com/mongo2",
          },
        ],
      },
      {
        name: "Database Models",
        topics: [
          {
            title: "Hierarchical Model",
            youtubeLink: "https://youtube.com/mongo1",
          },
          {
            title: "Network Model",
            youtubeLink: "https://youtube.com/mongo2",
          },
          {
            title: "Relational Model",
            youtubeLink: "https://youtube.com/mongo2",
          },
        ],
      },
      {
        name: "SQL",
        topics: [
          {
            title: "DDL Commands",
            youtubeLink: "https://youtu.be/vUj-kUEC_oA?feature=shared",
          },
          {
            title: "DML Commands",
            youtubeLink: "https://youtu.be/vUj-kUEC_oA?feature=shared",
          },
          {
            title: "DCL and TCL Commands",
            youtubeLink: "hhttps://youtu.be/vUj-kUEC_oA?feature=shared",
          },
        ],
      },
      {
        name: "Normalization",
        topics: [
          {
            title: "1NF, 2NF, 3NF",
            youtubeLink: "https://youtu.be/EGEwkad_llA?feature=shared",
          },
          {
            title: "BCNF, 4NF, 5NF",
            youtubeLink: "https://youtu.be/EGEwkad_llA?feature=shared",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Object Oriented Programming",
    image_link: "https://miro.medium.com/v2/resize:fit:619/1*qSVJ3X2zX5QCZyKMXEsIzw.png",
    short_description: "Models real-world entities using classes, objects and inheritance.",
    description:
      "Learn how to manage your code with Git and collaborate with others using GitHub. This course covers the basics of version control, committing changes, branching, and working with remote repositories.",
    heading: [
      {
        name: "Introduction",
        topics: [
          {
            title: "Basics of OOP",
            youtubeLink: "https://youtube.com/git1",
          },
          {
            title: "Advantages of OOP",
            youtubeLink: "https://youtube.com/git2",
          },
        ],
      },
      {
        name: "Principles",
        topics: [
          {
            title: "Encapsulation",
            youtubeLink: "https://youtube.com/git1",
          },
          {
            title: "Abstraction",
            youtubeLink: "https://youtube.com/git2",
          },
          {
            title: "Inheritance",
            youtubeLink: "https://youtube.com/git2",
          },
          {
            title: "Polymorphism",
            youtubeLink: "https://youtube.com/git2",
          },
        ],
      },
      {
        name: "Class and Object",
        topics: [
          {
            title: "What is a Class?",
            youtubeLink: "https://youtube.com/git1",
          },
          {
            title: "What is an Object?",
            youtubeLink: "https://youtube.com/git2",
          },
        ],
      },
      {
        name: "Constructors and Destructors",
        topics: [
          {
            title: "Constructors in OOP",
            youtubeLink: "https://youtube.com/git1",
          },
          {
            title: "Destructors in OOP",
            youtubeLink: "https://youtube.com/git2",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Operating System",
    image_link: "https://cdn-icons-png.flaticon.com/512/6303/6303082.png",
    short_description: "Manages hardware resources, provides interface, ensures multitasking and process control.",
    description:
      "Master the art of web design with HTML and CSS. Learn how to structure web pages, apply styles, use Flexbox and Grid systems, and build responsive layouts that look great on all devices.",
    heading: [
      {
        name: "Basics",
        topics: [
          { title: "Introduction",
            youtubeLink: "https://youtu.be/WJ-UaAaumNA?feature=shared" 
          },
          {
            title: "Types of OS",
            youtubeLink: "https://youtu.be/YQZbIT9FcUk?feature=shared",
          },
          {
            title: "Functions of OS",
            youtubeLink: "https://youtu.be/XRhhfeujs-8?feature=shared",
          },
          {
            title: "Kernel in OS",
            youtubeLink: "https://youtube.com/html2",
          },
          {
            title: "System Call",
            youtubeLink: "https://youtube.com/html2",
          },
        ],
      },
      {
        name: "Process Scheduling",
        topics: [
          { title: "Process Introduction",
            youtubeLink: "https://youtu.be/EdOiacz08zk?feature=shared" 
          },
          {
            title: "Process States",
            youtubeLink: "https://youtu.be/-ddfZ0atNAU?feature=shared",
          },
          {
            title: "Process Scheduler",
            youtubeLink: "https://youtu.be/2dJdHMpCLIg?feature=shared",
          },
          {
            title: "CPU Scheduling Algorithms",
            youtubeLink: "https://youtu.be/zFnrUVqtiOY?feature=shared",
          },
          {
            title: "Preemptive vs Non-Preemptive",
            youtubeLink: "https://youtu.be/zFnrUVqtiOY?feature=shared",
          },
        ],
      },
    ],
  },    
];



function AddCourse2() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: "",
    image_link: "",
    short_description: "",
    short_name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
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

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses"));
    setCourses(savedCourses || initialCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.description)
      return alert("All fields required!");
    setCourses((prev) => [...prev, { ...formData, heading: [] }]);
    setFormData({
      name: "",
      description: "",
      id: "",
      image_link: "",
      short_description: "",
      short_name: "",
    });
  };

  const handleDelete = (index) => {
    const updated = [...courses];
    updated.splice(index, 1);
    setCourses(updated);
  };

  const handleEdit = (index) => {
    const course = courses[index];
    setFormData({
      name: course.name,
      description: course.description,
      image_link: course.image_link,
      short_description: course.short_description,
      short_name: course.short_name,
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleUpdate = () => {
    const updatedCourses = [...courses];
    updatedCourses[editIndex] = {
      ...updatedCourses[editIndex],
      name: formData.name,
      description: formData.description,
      image_link: formData.image_link,
      short_description: formData.short_description,
      short_name: formData.short_name,
    };
    setCourses(updatedCourses);
    setFormData({
      name: "",
      description: "",
      id: "",
      image_link: "",
      short_description: "",
      short_name: "",
    });
    setIsEditing(false);
    setEditIndex(null);
  };

  const addHeading = () => {
    if (!newHeading) return;
    const updated = [...courses];
    updated[selectedCourseIndex].heading.push({ name: newHeading, topics: [] });
    setCourses(updated);
    setNewHeading("");
  };

  const deleteHeading = (headingIndex) => {
    const updated = [...courses];
    updated[selectedCourseIndex].heading.splice(headingIndex, 1);
    setCourses(updated);
  };

  const editHeading = (headingIndex) => {
    setEditingHeadingIndex(headingIndex);
    setEditedHeadingName(
      courses[selectedCourseIndex].heading[headingIndex].name
    );
  };

  const saveEditedHeading = () => {
    const updated = [...courses];
    updated[selectedCourseIndex].heading[editingHeadingIndex].name =
      editedHeadingName;
    setCourses(updated);
    setEditingHeadingIndex(null);
    setEditedHeadingName("");
  };

  const cancelEditHeading = () => {
    setEditingHeadingIndex(null);
    setEditedHeadingName("");
  };

  const addTopic = (headingIndex) => {
    if (!newTopic.title || !newTopic.youtubeLink) return;
    const updated = [...courses];
    updated[selectedCourseIndex].heading[headingIndex].topics.push({
      ...newTopic,
    });
    setCourses(updated);
    setNewTopic({ title: "", youtubeLink: "" });
  };

  const deleteTopic = (headingIndex, topicIndex) => {
    const updated = [...courses];
    updated[selectedCourseIndex].heading[headingIndex].topics.splice(
      topicIndex,
      1
    );
    setCourses(updated);
  };

  const startEditTopic = (headingIndex, topicIndex) => {
    const topic =
      courses[selectedCourseIndex].heading[headingIndex].topics[topicIndex];
    setEditingTopic({
      headingIndex,
      topicIndex,
      title: topic.title,
      youtubeLink: topic.youtubeLink,
    });
  };

  const saveEditTopic = () => {
    const { headingIndex, topicIndex, title, youtubeLink } = editingTopic;
    const updated = [...courses];
    updated[selectedCourseIndex].heading[headingIndex].topics[topicIndex] = {
      title,
      youtubeLink,
    };
    setCourses(updated);
    setEditingTopic({
      headingIndex: null,
      topicIndex: null,
      title: "",
      youtubeLink: "",
    });
  };

  const cancelEditTopic = () => {
    setEditingTopic({
      headingIndex: null,
      topicIndex: null,
      title: "",
      youtubeLink: "",
    });
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
      <div className="p-6 max-w-5xl mx-auto bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen rounded-xl shadow-inner">
        <h1 className="text-3xl font-bold mb-6">📘 Course Dashboard</h1>

        {/* Admin Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-green-600 text-white p-5 shadow rounded-xl">
            <h2 className="text-xl font-semibold">
              {getGreeting()}, {user?.name} 👋
            </h2>
            <p className="text-sm mt-1">Welcome to your dashboard</p>
            <p className="mt-2">📧 {user?.email}</p>
            <p>🛡️ {user?.role?.toUpperCase()}</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-xl">
            <h2 className="text-xl font-semibold">📚 Total Courses</h2>
            <p className="text-3xl font-bold">{courses.length}</p>
          </div>
        </div>

        {/* Add/Edit Course */}
        <div className="bg-white p-4 rounded shadow mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {isEditing ? "Edit Course" : "Add Course"}
          </h2>
          <input
            name="name"
            placeholder="Course Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />
          <input
            name="image_link"
            placeholder="Image URL"
            value={formData.image_link}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />

          <input
            name="short_description"
            placeholder="Short Description"
            value={formData.short_description}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
          />

          <input
            name="short_name"
            placeholder="Short Name"
            value={formData.short_name}
            onChange={handleChange}
            className="border p-2 mb-2 w-full"
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
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          )}
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-bold">{course.name}</h3>
              <p>{course.description}</p>
              <div className="flex gap-4 text-sm mt-2">
                <button
                  onClick={() => handleEdit(idx)}
                  className="text-yellow-600"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-red-600"
                >
                  🗑 Delete
                </button>
                <button
                  onClick={() => setSelectedCourseIndex(idx)}
                  className="text-blue-600"
                >
                  📂 View Headings
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Heading + Topics */}
        {selectedCourseIndex !== null && (
          <div className="mt-10 bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold mb-4">
              🗂 Headings for "{courses[selectedCourseIndex].name}"
            </h2>
            <input
              value={newHeading}
              onChange={(e) => setNewHeading(e.target.value)}
              placeholder="New Heading Name"
              className="border p-2 mb-2 w-full"
            />
            <button
              onClick={addHeading}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
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
                        className="border p-1 flex-1 mr-2"
                      />
                      <div className=" space-x-3">
                        <button
                          onClick={saveEditedHeading}
                          className="text-green-600 text-sm"
                        >
                          ✅
                        </button>
                        <button
                          onClick={cancelEditHeading}
                          className="text-red-600 text-sm ml-1"
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
                          className="text-yellow-500 text-sm mr-2"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => deleteHeading(hIdx)}
                          className="text-red-600 text-sm"
                        >
                          ❌ Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>

                <table className="w-full border text-sm mb-2">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border px-2 py-1 text-left">Title</th>
                      <th className="border px-2 py-1 text-left">
                        YouTube Link
                      </th>
                      <th className="border px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heading.topics.map((topic, tIdx) => (
                      <tr key={tIdx}>
                        {editingTopic.headingIndex === hIdx &&
                        editingTopic.topicIndex === tIdx ? (
                          <>
                            <td className="border px-2 py-1">
                              <input
                                value={editingTopic.title}
                                onChange={(e) =>
                                  setEditingTopic({
                                    ...editingTopic,
                                    title: e.target.value,
                                  })
                                }
                                className="border p-1 w-full"
                              />
                            </td>
                            <td className="border px-2 py-1">
                              <input
                                value={editingTopic.youtubeLink}
                                onChange={(e) =>
                                  setEditingTopic({
                                    ...editingTopic,
                                    youtubeLink: e.target.value,
                                  })
                                }
                                className="border p-1 w-full"
                              />
                            </td>
                            <td className="border px-2 py-1 text-center space-x-4">
                              <button
                                onClick={saveEditTopic}
                                className="text-green-600 text-sm mr-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={cancelEditTopic}
                                className="text-red-600 text-sm"
                              >
                                Delete
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border px-2 py-1">{topic.title}</td>
                            <td className="border px-2 py-1 text-blue-600">
                              <a
                                href={topic.youtubeLink}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {topic.youtubeLink}
                              </a>
                            </td>
                            <td className="border px-2 py-1 text-center space-x-4">
                              <button
                                onClick={() => startEditTopic(hIdx, tIdx)}
                                className="text-yellow-500 text-sm mr-1"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTopic(hIdx, tIdx)}
                                className="text-red-600 text-sm"
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
                    className="border p-1 flex-1"
                  />
                  <input
                    placeholder="YouTube Link"
                    value={newTopic.youtubeLink}
                    onChange={(e) =>
                      setNewTopic({ ...newTopic, youtubeLink: e.target.value })
                    }
                    className="border p-1 flex-1"
                  />
                  <button
                    onClick={() => addTopic(hIdx)}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Add
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
