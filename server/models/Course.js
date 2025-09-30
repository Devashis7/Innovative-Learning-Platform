const mongoose = require("mongoose");

const SubTopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  resources: [
    {
      type: { type: String, enum: ["youtube", "note"] },
      link: { type: String },
      description: { type: String },
    },
  ],
});

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtopics: [SubTopicSchema],
});

const UnitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [TopicSchema],
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image_link: { type: String },
  short_description: { type: String },
  short_name: { type: String },
  semester: { type: Number },
  branch: { type: String },
  credits: { type: Number },
  category: { type: String },
  totalTopics: { type: Number },
  units: [UnitSchema],
  prerequisites: [{ type: String }],
  learningOutcomes: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
