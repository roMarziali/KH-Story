const express = require("express");
const router = express.Router();
const StoryManager = require("../models/story-manager");
const { logSegmentsConsultation } = require("../models/logger");

router.get("/story", async (req, res, next) => {
  const segments = await StoryManager.getStory();
  res.send(segments);
});

router.get("/annotations", async (req, res, next) => {
  const userWebAgent = req.headers['user-agent'];
  logSegmentsConsultation(userWebAgent);
  const annotations = await StoryManager.getAnnotations();
  res.send(annotations);
});

module.exports = router;
