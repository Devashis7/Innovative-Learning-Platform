const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // Basic user information
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  
  // Student profile information
  profile: {
    avatar: { type: String }, // URL to profile picture
    currentSemester: { type: Number, min: 1, max: 8 },
    branch: { type: String, default: "CSE" },
    rollNumber: { type: String },
    college: { type: String },
    graduationYear: { type: Number },
    
    // Learning preferences
    learningStyle: { 
      type: String, 
      enum: ["Visual", "Auditory", "Reading", "Kinesthetic"], 
      default: "Visual" 
    },
    preferredStudyTime: { 
      type: String, 
      enum: ["Morning", "Afternoon", "Evening", "Night"],
      default: "Evening"
    },
    dailyStudyGoal: { type: Number, default: 60 }, // minutes per day
    weeklyStudyGoal: { type: Number, default: 420 }, // minutes per week
  },
  
  // Learning statistics
  stats: {
    totalCoursesEnrolled: { type: Number, default: 0 },
    totalCoursesCompleted: { type: Number, default: 0 },
    totalStudyTime: { type: Number, default: 0 }, // in minutes
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    totalBadges: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    experiencePoints: { type: Number, default: 0 }
  },
  
  // Enrolled courses
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    enrolledAt: { type: Date, default: Date.now },
    targetCompletion: { type: Date }
  }],
  
  // Bookmarked topics for quick access
  bookmarks: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    unitId: { type: String },
    topicId: { type: String },
    subtopicId: { type: String },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Notification preferences
  notifications: {
    emailNotifications: { type: Boolean, default: true },
    studyReminders: { type: Boolean, default: true },
    achievementAlerts: { type: Boolean, default: true },
    weeklyProgress: { type: Boolean, default: true }
  },
  
  // Account status
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  lastLoginAt: { type: Date },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Pre-save middleware to update timestamps
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Virtual for user's full display info
UserSchema.virtual('displayInfo').get(function() {
  return {
    name: this.name,
    semester: this.profile.currentSemester,
    branch: this.profile.branch,
    level: this.stats.level,
    streak: this.stats.currentStreak
  };
});

// Method to calculate user level based on experience points
UserSchema.methods.calculateLevel = function() {
  const xp = this.stats.experiencePoints;
  const level = Math.floor(xp / 1000) + 1; // 1000 XP per level
  this.stats.level = level;
  return level;
};

// Method to add experience points
UserSchema.methods.addExperience = function(points) {
  this.stats.experiencePoints += points;
  this.calculateLevel();
  return this.stats.experiencePoints;
};

module.exports = mongoose.model("User", UserSchema);
