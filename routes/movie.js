const express = require('express');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/reqValidator');

const movieRoutes = express.Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movie');

movieRoutes.post(
  '/',
  createMovieValidation,
  createMovie,
);

movieRoutes.get('/', getMovies);
movieRoutes.delete(
  '/:_id',
  deleteMovieValidation,
  deleteMovie,
);

module.exports = { movieRoutes };
