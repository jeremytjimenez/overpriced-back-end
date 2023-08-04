const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const GamesController = require("./controllers/gamesController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/games", GamesController);

app.get("/", (req, res) => {
  res.send("Welcome to Overpriced App");
});

app.get("*", (req, res) => {
  res.send("Page not found");
});

module.exports = app;
