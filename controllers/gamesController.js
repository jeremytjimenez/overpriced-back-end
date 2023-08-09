const express = require("express");
const router = express.Router();
const {
  getAllGames,
  getGameById,
  createGame,
  deleteGameById,
  updateGameById,
} = require("../queries/games");
const {
  checkRelease_Year,
  checkPrice,
  checkArt,
} = require("../validations/checkGames");

router.get("/", async (req, res) => {
  const allGames = await getAllGames();

  if (Array.isArray(allGames)) {
    res.json(allGames);
  } else {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const game = await getGameById(id);
  if (game.length === 0) {
    res.status(404).json({ error: "Game not found" });
  } else {
    res.json(game[0]);
  }
});

router.post("/", checkRelease_Year, checkPrice, async (req, res) => {
  try {
    const artUrl = req.body.art
      ? req.body.art
      : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    const gameData = {
      ...req.body,
      art: artUrl,
    };

    const game = await createGame(gameData);
    res.json(game);
  } catch (error) {
    res.status(404).json({ error: "error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedGame = await deleteGameById(id);
  if (deletedGame.length === 0) {
    res.status(404).json({ error: "Game not found" });
  } else {
    res.json(deletedGame[0]);
  }
});

router.put("/:id", checkRelease_Year, checkArt, checkPrice, async (req, res) => {
  try {
    const { id } = req.params;
    const artUrl = req.body.art ? req.body.art : "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";

    const updatedGameData = {
      ...req.body,
      art: artUrl,
    };

    const updatedGame = await updateGameById(id, updatedGameData);
    if (updatedGame.length === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json(updatedGame[0]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;