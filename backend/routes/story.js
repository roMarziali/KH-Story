const express = require("express");
const router = express.Router();
const SegmentManager = require("../models/segment-manager");

router.get("/segments", async (req, res, next) => {
  const segments = await SegmentManager.getSegments();
  res.send(segments);
});

module.exports = router;
