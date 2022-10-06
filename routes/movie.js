const express = require('express');
const { celebrate, Joi } = require('celebrate');

const movieRoutes = express.Router();
const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movie');

movieRoutes.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/,
        ),
      trailerLink: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/,
        ),
      thumbnail: Joi.string()
        .required()
        .pattern(
          /https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/,
        ),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie,
);

movieRoutes.get('/', getMovies);
movieRoutes.delete(
  '/:_id',
  celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex(),
    }),
  }),

  deleteMovie,
);

module.exports = { movieRoutes };
