const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeLink: { type: String, required: true },
});

const HeadingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [TopicSchema],
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  heading: [HeadingSchema],
});

module.exports = mongoose.model("Course", CourseSchema);
