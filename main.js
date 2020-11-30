const express = require("express");
const path = require("path");
const ApiRouter = require("./backend/index");
const bodyParser = require("body-parser");
const keys = require("./backend/config/keys");
const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.use("/api", ApiRouter);
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});

app.listen(keys.port);
