const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  isCompleted: { type: Boolean, default: false }
});

module.exports = mongoose.model("Progress", ProgressSchema);
