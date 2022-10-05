const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRoutes = express.Router();
const {
  updateUserInfo,
  getUserMe,
} = require('../controllers/users');

userRoutes.get('/me', getUserMe);

userRoutes.patch(
  '/me',
  express.json(),
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),

  updateUserInfo,
);

module.exports = userRoutes;
