const express = require("express");
const router = express.Router();
const StoryManager = require("../models/story-manager");
const checkAuth = require("../middleware/check-auth");
const InformationManager = require("../models/information-manager");

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
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.put("/section/:chapterId/:sectionId", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.editSection(req.body.title, req.params.chapterId, req.params.sectionId);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.delete("/section/:chapterId/:sectionId", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.deleteSection(req.params.chapterId, req.params.sectionId);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.post("/paragraph", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.addParagraph(req.body.paragraph, req.body.textFormMetadata);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.put("/paragraph/:chapterId/:sectionId/:paragraphId", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.editParagraph(req.body.paragraph, req.params.chapterId, req.params.sectionId, req.params.paragraphId);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.delete("/paragraph/:chapterId/:sectionId/:paragraphId", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.deleteParagraph(req.params.chapterId, req.params.sectionId, req.params.paragraphId);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.get("/paragraph/:chapterId/:sectionId/:paragraphId", checkAuth, async (req, res, next) => {
  try {
    const paragraph = await StoryManager.getParagraph(req.params.chapterId, req.params.sectionId, req.params.paragraphId);
    res.json(paragraph);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.post("/chapters-manager", checkAuth, async (req, res, next) => {
  try {
    await StoryManager.updateChaptersMetadata(req.body.chaptersMetadata);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

router.get("/information", async (req, res, next) => {
  const information = await InformationManager.getInformation();
  res.send(information);
});

router.post("/information", checkAuth, async (req, res, next) => {
  try {
    await InformationManager.addInformation(req.body);
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Erreur d'exécution" });
  }
});

module.exports = router;
