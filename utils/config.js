require('dotenv').config();

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
});

const { JWT_SECRET = 'a0d09c51-712e-4f6f-b569-ab027c2c1fac', PORT = 3001, DATABASE_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;
const SALT_LENGTH = 10;

module.exports = {
  JWT_SECRET, SALT_LENGTH, DATABASE_URL, PORT, limiter,
};
