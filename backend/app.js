const express = require("express");
const app = express();
const story = require("./routes/story");
app.use("/api/story", story);



module.exports = app;
