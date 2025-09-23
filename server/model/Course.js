const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const HeadingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  topics: [TopicSchema],
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image_link: { type: String },
  short_description: { type: String },
  short_name: { type: String },
  heading: [HeadingSchema],
});

module.exports = mongoose.model("Course", CourseSchema);
