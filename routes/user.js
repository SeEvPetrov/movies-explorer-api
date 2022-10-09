const express = require('express');
const { updateUserValidation } = require('../middlewares/reqValidator');

const userRoutes = express.Router();
const {
  updateUserInfo,
  getUserMe,
} = require('../controllers/users');

userRoutes.get('/me', getUserMe);

userRoutes.patch(
  '/me',
  updateUserValidation,
  updateUserInfo,
);

module.exports = { userRoutes };
