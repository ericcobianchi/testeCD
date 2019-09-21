const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const logParser = require("./gameParser/gameParser.js");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("", (req, res) => {
  res.send(logParser.logParsed());
});

app.listen(3000);
