const express = require("express");
const app = express();
const story = require("./routes/story");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/story", story);

app.use(express.static(__dirname + '/angular'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})



module.exports = app;
