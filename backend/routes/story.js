const express = require("express");
const router = express.Router();
const SegmentManager = require("../models/segment-manager");
const { logSegmentsConsultation } = require("../models/logger");

router.get("/segments", async (req, res, next) => {
  const segments = await SegmentManager.getSegments();
  res.send(segments);
});

router.get("/annotations", async (req, res, next) => {
  const userWebAgent = req.headers['user-agent'];
  logSegmentsConsultation(userWebAgent);
  const annotations = await SegmentManager.getAnnotations();
  res.send(annotations);
});

module.exports = router;
