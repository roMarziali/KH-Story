const express = require("express");
const router = express.Router();
const StoryManager = require("../models/story-manager");
const checkAuth = require("../middleware/check-auth");

router.get("/story", async (req, res, next) => {
  const story = await StoryManager.getStory();
  res.send(story);
});

router.get("/annotations", async (req, res, next) => {
  const annotations = await StoryManager.getAnnotations();
  res.send(annotations);
});

router.post("/section", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.addSection(req.body.title, req.body.textFormMetadata);
    res.json({ status: "ok" });
  } catch (err) {
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

module.exports = router;
