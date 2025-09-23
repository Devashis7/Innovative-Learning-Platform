app.patch("/progress/:topicId", authenticate, async (req, res) => {
  const { topicId } = req.params;
  let progress = await Progress.findOne({ userId: req.user.userId, topicId });

  if (!progress) {
    progress = new Progress({ userId: req.user.userId, topicId, isCompleted: true });
  } else {
    progress.isCompleted = !progress.isCompleted;
  }

  await progress.save();
  res.json({ message: "Progress updated", progress });
});

// Get User Progress
app.get("/progress", authenticate, async (req, res) => {
  const progress = await Progress.find({ userId: req.user.userId }).populate("topicId");
  res.json(progress);
});
