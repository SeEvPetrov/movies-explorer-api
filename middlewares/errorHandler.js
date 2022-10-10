const { ERROR_MESSAGES } = require('../utils/errorsConstants');

const errorhandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? ERROR_MESSAGES.SERVER_ERROR : message,
  });
  next();
};

module.exports = {
  errorhandler,
};
