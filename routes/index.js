const express = require('express');
const { createUserValidation, loginValidation } = require('../middlewares/reqValidator');

const routes = express.Router();
const { userRoutes } = require('./user');
const { movieRoutes } = require('./movie');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { ErrorNotFound } = require('../errors/index');
const { ERROR_MESSAGES } = require('../utils/errorsConstants');

routes.all('*', express.json());

routes.post(
  '/signup',
  createUserValidation,
  createUser,
);

routes.post(
  '/signin',
  loginValidation,
  login,
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('*', (req, res, next) => next(new ErrorNotFound(ERROR_MESSAGES.PAGE_NOT_FOUND)));

module.exports = { routes };
