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

router.post("/text", checkAuth, async (req, res, next) => {
  const action = req.body.metaDataText.action;
  const text = req.body.text;
  const metaDataText = req.body.metaDataText;
  if (action === "adding") {
    await StoryManager.addText(text, metaDataText);
  } else if (action === "editing") {
    await StoryManager.editText(text, metaDataText);
  }
  res.json({ status: "ok" });
});

module.exports = router;
