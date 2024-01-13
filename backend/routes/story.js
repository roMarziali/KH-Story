const express = require("express");
const router = express.Router();
const StoryManager = require("../models/story-manager");

router.get("/story", async (req, res, next) => {
  const story = await StoryManager.getStory();
  res.send(story);
});

router.get("/annotations", async (req, res, next) => {
  const userWebAgent = req.headers['user-agent'];
  const annotations = await StoryManager.getAnnotations();
  res.send(annotations);
});

module.exports = router;
