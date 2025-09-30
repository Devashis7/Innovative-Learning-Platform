const mongoose = require("mongoose");
const Course = require("./models/Course");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const btechCSESubjects = [
  {
    name: "Data Structures and Algorithms",
    description: "Comprehensive course covering fundamental data structures and algorithms essential for programming and problem-solving.",
    short_name: "DSA",
    semester: 3,
    category: "Core",
    credits: 4,
    image_link: "https://via.placeholder.com/300x200?text=DSA",
    prerequisites: ["Programming Fundamentals", "Mathematics"],
    learningOutcomes: [
      "Understand various data structures and their applications",
      "Implement sorting and searching algorithms",
      "Analyze time and space complexity",
      "Solve complex programming problems"
    ],
    units: [
      {
        name: "Arrays and Strings",
        description: "Fundamental data structures and string manipulation techniques",
        order: 1,
        topics: [
          {
            title: "Array Operations",
            description: "Basic array operations, searching, and sorting",
            order: 1,
            subtopics: [
              {
                title: "Array Declaration and Initialization",
                description: "How to declare and initialize arrays in different programming languages",
                youtubeLink: "https://www.youtube.com/watch?v=55l-aZ7_F24",
                difficulty: "Easy",
                estimatedTime: 30,
                resources: [
                  {
                    title: "Array Basics Tutorial",
                    url: "https://www.geeksforgeeks.org/array-data-structure/",
                    type: "article"
                  }
                ]
              },
              {
                title: "Linear Search",
                description: "Sequential search technique for finding elements in arrays",
                youtubeLink: "https://www.youtube.com/watch?v=246V51AWwZM",
                difficulty: "Easy",
                estimatedTime: 45,
                resources: [
                  {
                    title: "Linear Search Implementation",
                    url: "https://www.geeksforgeeks.org/linear-search/",
                    type: "article"
                  }
                ]
              },
              {
                title: "Binary Search",
                description: "Efficient search algorithm for sorted arrays",
                youtubeLink: "https://www.youtube.com/watch?v=P3YID7liBug",
                difficulty: "Medium",
                estimatedTime: 60,
                resources: [
                  {
                    title: "Binary Search Tutorial",
                    url: "https://www.geeksforgeeks.org/binary-search/",
                    type: "article"
                  }
                ]
              }
            ]
          },
          {
            title: "String Algorithms",
            description: "String manipulation and pattern matching algorithms",
            order: 2,
            subtopics: [
              {
                title: "String Basics",
                description: "String declaration, initialization, and basic operations",
                youtubeLink: "https://www.youtube.com/watch?v=Wdjr6uoZ0e0",
                difficulty: "Easy",
                estimatedTime: 30
              },
              {
                title: "Pattern Matching - KMP Algorithm",
                description: "Knuth-Morris-Pratt algorithm for efficient pattern matching",
                youtubeLink: "https://www.youtube.com/watch?v=GTJr8OvyEVQ",
                difficulty: "Hard",
                estimatedTime: 90
              }
            ]
          }
        ]
      },
      {
        name: "Linked Lists",
        description: "Dynamic data structures and linked list operations",
        order: 2,
        topics: [
          {
            title: "Singly Linked Lists",
            description: "Basic linked list operations and implementations",
            order: 1,
            subtopics: [
              {
                title: "Linked List Introduction",
                description: "Understanding linked lists and their advantages over arrays",
                youtubeLink: "https://www.youtube.com/watch?v=NobHlGUjV3g",
                difficulty: "Easy",
                estimatedTime: 45
              },
              {
                title: "Insertion Operations",
                description: "Insert elements at beginning, end, and specific positions",
                youtubeLink: "https://www.youtube.com/watch?v=o5wJkJJpKtM",
                difficulty: "Medium",
                estimatedTime: 60
              },
              {
                title: "Deletion Operations",
                description: "Delete elements from various positions in linked list",
                youtubeLink: "https://www.youtube.com/watch?v=Y0n86K43GO4",
                difficulty: "Medium",
                estimatedTime: 60
              }
            ]
          },
          {
            title: "Doubly Linked Lists",
            description: "Bidirectional linked lists and their operations",
            order: 2,
            subtopics: [
              {
                title: "Doubly Linked List Basics",
                description: "Introduction to doubly linked lists and their structure",
                youtubeLink: "https://www.youtube.com/watch?v=k0pjD12bzP0",
                difficulty: "Medium",
                estimatedTime: 50
              }
            ]
          }
        ]
      },
      {
        name: "Stacks and Queues",
        description: "LIFO and FIFO data structures with applications",
        order: 3,
        topics: [
          {
            title: "Stack Operations",
            description: "Push, pop, and peek operations with applications",
            order: 1,
            subtopics: [
              {
                title: "Stack Implementation",
                description: "Array and linked list based stack implementations",
                youtubeLink: "https://www.youtube.com/watch?v=F1F2imiOJfk",
                difficulty: "Easy",
                estimatedTime: 45
              },
              {
                title: "Infix to Postfix Conversion",
                description: "Convert infix expressions to postfix using stacks",
                youtubeLink: "https://www.youtube.com/watch?v=PAceaOSnxQs",
                difficulty: "Medium",
                estimatedTime: 75
              }
            ]
          },
          {
            title: "Queue Operations",
            description: "Enqueue, dequeue operations and queue variants",
            order: 2,
            subtopics: [
              {
                title: "Queue Implementation",
                description: "Array and linked list based queue implementations",
                youtubeLink: "https://www.youtube.com/watch?v=okr-XE8yTO8",
                difficulty: "Easy",
                estimatedTime: 45
              },
              {
                title: "Circular Queue",
                description: "Circular queue implementation and advantages",
                youtubeLink: "https://www.youtube.com/watch?v=dn56XcjMBDs",
                difficulty: "Medium",
                estimatedTime: 60
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Database Management Systems",
    description: "Comprehensive study of database concepts, design, and management techniques.",
    short_name: "DBMS",
    semester: 4,
    category: "Core",
    credits: 3,
    image_link: "https://via.placeholder.com/300x200?text=DBMS",
    prerequisites: ["Data Structures"],
    learningOutcomes: [
      "Design efficient database schemas",
      "Write complex SQL queries",
      "Understand database normalization",
      "Implement database transactions"
    ],
    units: [
      {
        name: "Introduction to Databases",
        description: "Basic concepts of database systems and DBMS architecture",
        order: 1,
        topics: [
          {
            title: "Database Concepts",
            description: "Understanding data, databases, and database management systems",
            order: 1,
            subtopics: [
              {
                title: "What is a Database?",
                description: "Introduction to databases and their importance",
                youtubeLink: "https://www.youtube.com/watch?v=FR4QIeZoH7c",
                difficulty: "Easy",
                estimatedTime: 30
              },
              {
                title: "DBMS Architecture",
                description: "Three-level architecture of database systems",
                youtubeLink: "https://www.youtube.com/watch?v=bZ6e_Q8_rJ4",
                difficulty: "Medium",
                estimatedTime: 45
              }
            ]
          }
        ]
      },
      {
        name: "SQL and Query Processing",
        description: "Structured Query Language and database operations",
        order: 2,
        topics: [
          {
            title: "Basic SQL Operations",
            description: "SELECT, INSERT, UPDATE, DELETE operations",
            order: 1,
            subtopics: [
              {
                title: "SELECT Statements",
                description: "Basic and advanced SELECT query operations",
                youtubeLink: "https://www.youtube.com/watch?v=9Pzj7Aj25lw",
                difficulty: "Easy",
                estimatedTime: 60
              },
              {
                title: "JOIN Operations",
                description: "Inner, outer, left, right joins and their applications",
                youtubeLink: "https://www.youtube.com/watch?v=2HVMiPPuPIM",
                difficulty: "Medium",
                estimatedTime: 75
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Operating Systems",
    description: "Study of operating system concepts, process management, and system calls.",
    short_name: "OS",
    semester: 5,
    category: "Core",
    credits: 4,
    image_link: "https://via.placeholder.com/300x200?text=OS",
    prerequisites: ["Computer Organization", "Data Structures"],
    learningOutcomes: [
      "Understand OS architecture and components",
      "Learn process and thread management",
      "Study memory management techniques",
      "Understand file systems and I/O"
    ],
    units: [
      {
        name: "Introduction to Operating Systems",
        description: "Basic concepts and functions of operating systems",
        order: 1,
        topics: [
          {
            title: "OS Fundamentals",
            description: "What is an OS and its main functions",
            order: 1,
            subtopics: [
              {
                title: "Operating System Overview",
                description: "Introduction to operating systems and their role",
                youtubeLink: "https://www.youtube.com/watch?v=26QPDBe-NB8",
                difficulty: "Easy",
                estimatedTime: 40
              },
              {
                title: "Types of Operating Systems",
                description: "Batch, interactive, real-time, and distributed systems",
                youtubeLink: "https://www.youtube.com/watch?v=RozoeWzT7IM",
                difficulty: "Easy",
                estimatedTime: 35
              }
            ]
          }
        ]
      },
      {
        name: "Process Management",
        description: "Process lifecycle, scheduling, and synchronization",
        order: 2,
        topics: [
          {
            title: "Process Concepts",
            description: "Process states, PCB, and process operations",
            order: 1,
            subtopics: [
              {
                title: "Process States and Transitions",
                description: "Understanding process lifecycle and state changes",
                youtubeLink: "https://www.youtube.com/watch?v=OrM7nZcxXZU",
                difficulty: "Medium",
                estimatedTime: 50
              },
              {
                title: "CPU Scheduling Algorithms",
                description: "FCFS, SJF, Round Robin, and Priority scheduling",
                youtubeLink: "https://www.youtube.com/watch?v=EWkQl0n0w5M",
                difficulty: "Medium",
                estimatedTime: 70
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Computer Networks",
    description: "Networking concepts, protocols, and network security fundamentals.",
    short_name: "CN",
    semester: 6,
    category: "Core",
    credits: 3,
    image_link: "https://via.placeholder.com/300x200?text=CN",
    prerequisites: ["Operating Systems"],
    learningOutcomes: [
      "Understand network architectures and protocols",
      "Learn TCP/IP protocol suite",
      "Study network security concepts",
      "Understand routing and switching"
    ],
    units: [
      {
        name: "Network Fundamentals",
        description: "Basic networking concepts and OSI model",
        order: 1,
        topics: [
          {
            title: "Introduction to Networks",
            description: "Network types, topologies, and basic concepts",
            order: 1,
            subtopics: [
              {
                title: "Network Types and Topologies",
                description: "LAN, WAN, MAN and various network topologies",
                youtubeLink: "https://www.youtube.com/watch?v=cNwEVYkx2Kk",
                difficulty: "Easy",
                estimatedTime: 45
              },
              {
                title: "OSI Model",
                description: "Seven layer OSI model and its functions",
                youtubeLink: "https://www.youtube.com/watch?v=vv4y_uOneC0",
                difficulty: "Medium",
                estimatedTime: 60
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: "Software Engineering",
    description: "Software development lifecycle, methodologies, and project management.",
    short_name: "SE",
    semester: 5,
    category: "Core",
    credits: 3,
    image_link: "https://via.placeholder.com/300x200?text=SE",
    prerequisites: ["Object Oriented Programming"],
    learningOutcomes: [
      "Understand SDLC models and methodologies",
      "Learn software design principles",
      "Study testing and quality assurance",
      "Understand project management concepts"
    ],
    units: [
      {
        name: "Software Development Life Cycle",
        description: "Various SDLC models and their applications",
        order: 1,
        topics: [
          {
            title: "SDLC Models",
            description: "Waterfall, Agile, Spiral, and other development models",
            order: 1,
            subtopics: [
              {
                title: "Waterfall Model",
                description: "Sequential software development approach",
                youtubeLink: "https://www.youtube.com/watch?v=LxEmGNgqYJA",
                difficulty: "Easy",
                estimatedTime: 40
              },
              {
                title: "Agile Methodology",
                description: "Iterative and incremental development approach",
                youtubeLink: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
                difficulty: "Medium",
                estimatedTime: 55
              }
            ]
          }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log("Cleared existing courses");
    
    // Insert new courses
    for (const courseData of btechCSESubjects) {
      const course = new Course(courseData);
      await course.save();
      console.log(`✅ Seeded: ${course.name} (${course.short_name})`);
    }
    
    console.log("🎉 Database seeding completed successfully!");
    console.log(`📚 Total subjects added: ${btechCSESubjects.length}`);
    
    // Display summary
    console.log("\n📊 Seeded Subjects Summary:");
    btechCSESubjects.forEach((subject, index) => {
      const totalTopics = subject.units.reduce((acc, unit) => 
        acc + unit.topics.reduce((topicAcc, topic) => 
          topicAcc + topic.subtopics.length, 0), 0);
      
      console.log(`${index + 1}. ${subject.name} - Semester ${subject.semester} - ${totalTopics} subtopics`);
    });
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();