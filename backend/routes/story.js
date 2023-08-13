const express = require("express");
const router = express.Router();
const SegmentManager = require("../models/segment-manager");

router.get("/getSegments", async (req, res, next) => {
 const segments = await SegmentManager.getSegments();
  res.json(segments);
});

module.exports = router;
