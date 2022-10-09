const { BadRequestError } = require('./BadRequestError');
const { ErrorConflict } = require('./ErrorConflict');
const { ERROR_MESSAGES } = require('../utils/errorsConstants');

const customError = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    next(new BadRequestError(ERROR_MESSAGES.BAD_REQ_ERROR));
    return;
  }
  if (err.code === 11000) {
    next(new ErrorConflict(ERROR_MESSAGES.USER_CONFLICT));
    return;
  }
  next(err);
};

module.exports = { customError };
