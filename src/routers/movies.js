const express = require("express");
const { getMovies, createMovies, getMovie } = require("../controllers/movies");

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovies);
router.get("/:id", getMovie);

module.exports = router;
