require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT, DATABASE_URL, limiter } = require('./utils/config');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { routes } = require('./routes');
const { errorhandler } = require('./middlewares/errorHandler');

app.use(helmet());
app.use(limiter);
app.use(cors());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorhandler);

async function main() {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
    console.log(`Сервер запущен на ${PORT} порту`);
  } catch (err) {
    console.log(`Возникла ошибка: ${err} `);
  }
}

main();
