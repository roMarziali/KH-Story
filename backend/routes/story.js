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

router.post("/title", checkAuth, async (req, res, next) => {
  const action = req.body.textFormMetadata.action;
  if (action === "adding") {
    await StoryManager.addTitle(req.body.value.title, req.body.textFormMetadata);
  } else if (action === "editing") {
    await StoryManager.editTitle(req.body.value.title, req.body.textFormMetadata);
  }
  res.json({ status: "ok" });
});

module.exports = router;
