const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UserCommentsManager = require("../models/user-comments-manager");

router.get("/comments", async (req, res, next) => {
  const comments = await UserCommentsManager.getComments();
  res.send(comments);
});

router.post("/user-comment", async (req, res, next) => {
  const user = req.body.user;
  const comment = req.body.comment;
  const antispamAnswer = req.body.antispamAnswer;
  UserCommentsManager.recordComment(user, comment, antispamAnswer);
  res.json({ status: "ok" });
});

router.post("/admin-comment", checkAuth, async (req, res, next) => {
  const user = req.body.user;
  const comment = req.body.comment;
  const antispamAnswer = req.body.antispamAnswer;
  UserCommentsManager.recordComment(user, comment, antispamAnswer, true);
});

router.delete("/comment/:commentId", checkAuth, async (req, res, next) => {
  UserCommentsManager.deleteUserComment(req.params.commentId);
});

router.get("/antispam-question", async (req, res, next) => {
  const antispamQuestion = UserCommentsManager.getAntispamQuestion();
  res.send(antispamQuestion);
});

module.exports = router;
