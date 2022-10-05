require('dotenv').config();

const { JWT_SECRET = 'a0d09c51-712e-4f6f-b569-ab027c2c1fac' } = process.env;
const SALT_LENGTH = 10;
const DATABASE_URL = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  JWT_SECRET, SALT_LENGTH, DATABASE_URL,
};
