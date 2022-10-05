const express = require('express');
const { celebrate, Joi } = require('celebrate');

const routes = express.Router();
const { userRoutes } = require('./user');
const { movieRoutes } = require('./movie');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { ErrorNotFound } = require('../errors/index');

routes.all('*', express.json());

routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),

  createUser,
);

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),

  login,
);

routes.use(auth);

routes.use('/users', userRoutes);
routes.use('/movies', movieRoutes);

routes.use('*', (req, res, next) => next(new ErrorNotFound('Такого запроса не существует')));

module.exports = { routes };
