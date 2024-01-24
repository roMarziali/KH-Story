const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const story = require("./routes/story");
const auth = require("./routes/auth");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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
app.use("/api/auth", auth);

app.use(express.static(__dirname + '/angular'));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
})



module.exports = app;
