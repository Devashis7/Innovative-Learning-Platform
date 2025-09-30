const mongoose = require("mongoose");

// Individual subtopic progress
const SubTopicProgressSchema = new mongoose.Schema({
  subtopicId: { type: String, required: true }, // subtopic _id from Course schema
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date },
  timeSpent: { type: Number, default: 0 }, // in minutes
  notes: { type: String }, // user's personal notes
  bookmarked: { type: Boolean, default: false }
});

// Topic level progress
const TopicProgressSchema = new mongoose.Schema({
  topicId: { type: String, required: true }, // topic _id from Course schema
  subtopicsProgress: [SubTopicProgressSchema],
  completionPercentage: { type: Number, default: 0 },
  lastAccessedAt: { type: Date, default: Date.now }
});

// Unit level progress
const UnitProgressSchema = new mongoose.Schema({
  unitId: { type: String, required: true }, // unit _id from Course schema
  topicsProgress: [TopicProgressSchema],
  completionPercentage: { type: Number, default: 0 },
  startedAt: { type: Date },
  completedAt: { type: Date }
});

// Main Progress Schema - per user per course
const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  
  // Detailed progress tracking
  unitsProgress: [UnitProgressSchema],
  
  // Overall course progress
  overallProgress: { type: Number, default: 0 }, // percentage completed
  totalTimeSpent: { type: Number, default: 0 }, // total minutes spent
  
  // Learning analytics
  streak: { type: Number, default: 0 }, // consecutive days of learning
  lastStudiedAt: { type: Date },
  studyDates: [{ type: Date }], // array of dates when user studied
  
  // Course enrollment info
  enrolledAt: { type: Date, default: Date.now },
  targetCompletionDate: { type: Date },
  
  // Achievement tracking
  badges: [{
    name: String,
    earnedAt: Date,
    description: String
  }],
  
  // Performance metrics
  averageSessionTime: { type: Number, default: 0 },
  preferredStudyTime: { type: String }, // "morning", "afternoon", "evening", "night"
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Compound index for efficient queries
ProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Pre-save middleware to calculate progress percentages
ProgressSchema.pre('save', function(next) {
  let totalCompleted = 0;
  let totalSubtopics = 0;
  
  this.unitsProgress.forEach(unit => {
    let unitCompleted = 0;
    let unitTotal = 0;
    
    unit.topicsProgress.forEach(topic => {
      let topicCompleted = 0;
      let topicTotal = topic.subtopicsProgress.length;
      
      topic.subtopicsProgress.forEach(subtopic => {
        if (subtopic.isCompleted) {
          topicCompleted++;
          totalCompleted++;
        }
        totalSubtopics++;
      });
      
      topic.completionPercentage = topicTotal > 0 ? Math.round((topicCompleted / topicTotal) * 100) : 0;
      unitCompleted += topicCompleted;
      unitTotal += topicTotal;
    });
    
    unit.completionPercentage = unitTotal > 0 ? Math.round((unitCompleted / unitTotal) * 100) : 0;
  });
  
  this.overallProgress = totalSubtopics > 0 ? Math.round((totalCompleted / totalSubtopics) * 100) : 0;
  this.updatedAt = new Date();
  
  next();
});

module.exports = mongoose.model("Progress", ProgressSchema);
