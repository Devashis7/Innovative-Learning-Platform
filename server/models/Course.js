const mongoose = require("mongoose");

// SubTopic Schema - Individual learning items
const SubTopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  youtubeLink: { type: String },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  estimatedTime: { type: Number }, // in minutes
  resources: [{
    title: String,
    url: String,
    type: { type: String, enum: ["video", "article", "document", "practice"] }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Topic Schema - Collection of subtopics
const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subtopics: [SubTopicSchema],
  order: { type: Number, default: 0 }
});

// Unit Schema - Course units/chapters
const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  topics: [TopicSchema],
  order: { type: Number, default: 0 }
});

// Enhanced Course Schema for B.Tech CSE subjects
const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Data Structures and Algorithms"
  description: { type: String, required: true },
  image_link: { type: String },
  short_description: { type: String },
  short_name: { type: String }, // e.g., "DSA"
  
  // B.Tech specific fields
  semester: { type: Number, required: true, min: 1, max: 8 },
  branch: { type: String, default: "CSE" },
  credits: { type: Number },
  category: { 
    type: String, 
    enum: ["Core", "Elective", "Lab", "Project"], 
    default: "Core" 
  },
  
  // Course content structure
  units: [UnitSchema],
  
  // Course metadata
  totalTopics: { type: Number, default: 0 },
  estimatedHours: { type: Number },
  prerequisites: [{ type: String }],
  learningOutcomes: [{ type: String }],
  
  // Admin fields
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pre-save middleware to calculate totalTopics
CourseSchema.pre('save', function(next) {
  let totalTopics = 0;
  this.units.forEach(unit => {
    unit.topics.forEach(topic => {
      totalTopics += topic.subtopics.length;
    });
  });
  this.totalTopics = totalTopics;
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
