const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UserCommentsManager = require("../models/user-comments-manager");

router.get("/comments", async (req, res, next) => {
  const comments = await UserCommentsManager.getComments();
  res.send(comments);
});

router.post("/comment", async (req, res, next) => {
  const { user, comment, antiSpam } = formatBody(req.body);
  const response = await UserCommentsManager.recordComment(user, comment, antiSpam);
  res.json(response);
});

router.post("/admin-comment", checkAuth, async (req, res, next) => {
  const { user, comment, antiSpam } = formatBody(req.body);
  const response = await UserCommentsManager.recordComment(user, comment, antiSpam, true);
  res.json(response);
});

router.delete("/comment/:commentId", checkAuth, async (req, res, next) => {
  const response = await UserCommentsManager.deleteUserComment(req.params.commentId);
  res.json(response);
});

router.get("/antispam-question", async (req, res, next) => {
  const antispamQuestion = UserCommentsManager.getAntispamQuestion();
  res.send(antispamQuestion);
});

module.exports = router;

function formatBody(body) {
  const user = {
    name: body.name,
  }
  if (body.email) user.email = body.email;
  const comment = body.comment;
  const antiSpam = {
    id: body.antiSpamId,
    answer: body.antiSpamAnswer
  }
  return { user, comment, antiSpam };
}
