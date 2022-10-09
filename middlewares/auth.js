const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { AuthorizationError } = require('../errors/index');
const { ERROR_MESSAGES } = require('../utils/errorsConstants');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthorizationError(ERROR_MESSAGES.UNAUTHORIZED));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
