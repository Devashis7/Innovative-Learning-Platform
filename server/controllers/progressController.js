const Progress = require("../models/Progress");
const Course = require("../models/Course");

// Mark a subtopic as complete or incomplete
exports.markProgress = async (req, res) => {
  const { courseId, subtopicId, completed } = req.body;
  const userId = req.user.userId;

  try {
    const progress = await Progress.findOneAndUpdate(
      { userId, courseId, subtopicId },
      { completed },
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Get the progress for a course
exports.getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const userId = req.user.userId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, error: "Course not found" });
    }

    const totalSubtopics = course.units.reduce(
      (acc, unit) =>
        acc + unit.topics.reduce((acc, topic) => acc + topic.subtopics.length, 0),
      0
    );

    if (totalSubtopics === 0) {
      return res.status(200).json({ success: true, data: { progress: 0 } });
    }

    const completedSubtopics = await Progress.countDocuments({
      userId,
      courseId,
      completed: true,
    });

    const progress = (completedSubtopics / totalSubtopics) * 100;

    res.status(200).json({ success: true, data: { progress } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
