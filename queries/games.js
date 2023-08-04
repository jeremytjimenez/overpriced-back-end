const db = require("../db/dbConfig");

const getAllGames = async () => {
  try {
    const allGames = await db.any("SELECT * FROM games");

    return allGames;
  } catch (error) {
    return error;
  }
};

async function getGameById(id) {
  try {
    const foundGame = await db.any(`SELECT * FROM games WHERE id = $1`, id);

    return foundGame;
  } catch (error) {
    return error;
  }
}

// use returning * in order to return what was created

const createGame = async (data) => {
  try {
    const newGame = await db.one(
      "INSERT INTO games (name, release_year, developer, original_price, market_price, genre, is_multiplayer, art) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        data.name,
        data.release_year,
        data.developer,
        data.original_price,
        data.market_price,
        data.genre,
        data.is_multiplayer,
        data.art,
      ]
    );

    return { status: "successful!", data: newGame };
  } catch (error) {
    return error;
  }
};

const deleteGameById = async (id) => {
  try {
    const deletedGame = await db.any(
      "DELETE FROM games WHERE id = $1 RETURNING *",
      [id]
    );

    return { status: "successful!", data: deletedGame };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

const updateGameById = async (id, data) => {
  try {
    const originalGame = await db.any("SELECT * FROM games WHERE id = $1", [
      id,
    ]);

    let combinedGame = {
      ...originalGame[0],
      ...data,
    };

    const updatedGame = await db.one(
      "UPDATE games SET name = $1, release_year = $2, developer = $3, original_price = $4, market_price = $5, genre = $6, is_multiplayer = $7, art = $8 WHERE id = $9 RETURNING *",
      [
        combinedGame.name,
        combinedGame.release_year,
        combinedGame.developer,
        combinedGame.original_price,
        combinedGame.market_price,
        combinedGame.genre,
        combinedGame.is_multiplayer,
        combinedGame.art,
        id,
      ]
    );

    return { status: "successful!", data: updatedGame };
  } catch (error) {
    return { status: "failed", err: error };
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  deleteGameById,
  updateGameById,
};
