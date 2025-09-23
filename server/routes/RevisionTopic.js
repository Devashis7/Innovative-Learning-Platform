const Topic = require("./models/Topic");
app.get("/topics", async (req, res) => {
  const { category } = req.query;
  const topics = await Topic.find(category ? { category } : {});
  res.json(topics);
});

// Toggle Revision Star
app.patch("/topic/:id/revision", authenticate, async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) return res.status(404).json({ message: "Topic not found" });

  topic.isImportant = !topic.isImportant;
  await topic.save();
  res.json({ message: "Updated successfully", topic });
});
