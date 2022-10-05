const express = require('express');
const { celebrate, Joi } = require('celebrate');

const movieRoutes = express.Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movie');

