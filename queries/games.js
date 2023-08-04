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
            [data.name, data.release_year, data.developer, data.original_price, data.market_price, data.genre, data.is_multiplayer, data.art]
        );

        return newGame
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllBookmarks,
    getBookmarkById,
    createBookmark,
    deleteBookmark,
    updateBookmarkById
};