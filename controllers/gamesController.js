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

router.post("/", checkRelease_Year, checkArt, checkPrice, async (req, res) => {
  try {
    const game = await createGame(req.body);
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

router.put(
  "/:id",
  checkRelease_Year,
  checkArt,
  checkPrice,
  async (req, res) => {
    const { id } = req.params;
    const updatedGame = await updateGameById(id, req.body);
    if (updatedGame.length === 0) {
      res.status(404).json({ error: "Game not found" });
    } else {
      res.json(updatedGame[0]);
    }
  }
);

module.exports = router;