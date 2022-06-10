const res = require("express/lib/response");
const prisma = require("../utils/prisma");

// map
const filters = {
  greaterThan: "gt",
  lessThan: "lt",
};

const getMovies = async (req, res) => {
  // get data from the request
  const { runtimeMins, comparison } = req.query;

  // figure out is it less or greater than

  // only add the where clause if request has the query parameters

  const whereData = {};

  if (runtimeMins && comparison) {
    const filter = {};
    const prismaOperator = filters[comparison];
    filter[prismaOperator] = Number(runtimeMins);
    whereData.runtimeMins = filter;
  }

  const movies = await prisma.movie.findMany({
    where: whereData,
    include: {
      screenings: true,
    },
  });
  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  // get data from request - req.body
  const { screenings } = req.body;

  const movieData = {
    title: req.body.title,
    runtimeMins: Number(req.body.runtimeMins),
  };

  if (screenings) {
    movieData.screenings = { create: screenings };
  }

  try {
    const movie = await prisma.movie.create({
      data: movieData,
    });
    res.json({ data: movie });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const getMovie = async (req, res) => {
  // get data from req
  const { title } = req.query;

  const identifier = req.params.id;
  const whereData = {};
  // is it an id or title,
  if (!title && identifier == Number(identifier)) {
    whereData.id = Number(identifier);
  } else {
    whereData.title = identifier;
  }
  // create the query
  // execute the query

  const movie = await prisma.movie.findFirst({
    where: whereData,
  });

  if (!movie) {
    return res
      .status(404)
      .json({ error: `sorry movie identifier: ${identifier} not found` });
  }

  res.json({ data: movie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovie,
};
