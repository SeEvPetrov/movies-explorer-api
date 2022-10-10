const Movie = require('../models/movie');
const {
  ErrorNotFound,
  ForbiddenError,
  customError,
} = require('../errors/index');
const { ERROR_MESSAGES } = require('../utils/errorsConstants');

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user._id,
    });
    res.status(200).send(movie);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    res.status(200).send(movies);
  } catch (err) {
    customError(err, req, res, next);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new ErrorNotFound(ERROR_MESSAGES.MOVIE_NOT_FOUND);
    }
    if (req.user._id !== movie.owner.toString()) {
      next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN));
      return;
    }
    await movie.remove();
    res.status(200).send({ message: 'Карточка удалена' });
  } catch (err) {
    customError(err, req, res, next);
  }
};

module.exports = {
  createMovie,
  getMovies,
  deleteMovie,
};
