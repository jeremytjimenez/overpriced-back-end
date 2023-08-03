DROP DATABASE IF EXISTS games_dev;

CREATE DATABASE games_dev;

\c games_dev;

DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    release_year VARCHAR(4),
    developer TEXT,
    original_price DEC(7, 2),
    market_price DEC(7, 2),
    genre TEXT,
    is_multiplayer BOOLEAN DEFAULT false,
    art TEXT DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'
);