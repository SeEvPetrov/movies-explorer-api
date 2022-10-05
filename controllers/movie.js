const Movie = require('../models/movie');
const {
  ErrorNotFound,
  ForbiddenError,
  customError,
} = require('../errors/index');

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
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new ErrorNotFound('Карточка не найдена');
    }
    if (req.user._id !== movie.owner.toString()) {
      next(new ForbiddenError('Чужую карточку не удалить'));
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
