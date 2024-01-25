const express = require("express");
const router = express.Router();
const StoryManager = require("../models/story-manager");
const checkAuth = require("../middleware/check-auth");

router.get("/story", async (req, res, next) => {
  const story = await StoryManager.getStory();
  res.send(story);
});

router.get("/annotations", async (req, res, next) => {
  const userWebAgent = req.headers['user-agent'];
  const annotations = await StoryManager.getAnnotations();
  res.send(annotations);
});

router.post("/text", checkAuth, async (req, res, next) => {
  console.log(req.body);
  res.json({ status: "ok" });
});

module.exports = router;
