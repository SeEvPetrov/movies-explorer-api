const ERROR_MESSAGES = {
  USER_CONFLICT: 'Пользователь с таким email уже существует',
  FORBIDDEN: 'Чужой фильм не удалить',
  USER_NOT_FOUND: 'Пользователь не найден',
  MOVIE_NOT_FOUND: 'Фильм не найден',
  PAGE_NOT_FOUND: 'Неверный адрес запроса',
  WRONG_CREDENTIALS: 'Неправильный логин или пароль',
  UNAUTHORIZED: 'Авторизуйтесь',
  BAD_REQ_ERROR: 'Неверный запрос или данные',
  SERVER_ERROR: 'На сервере произошла ошибка',
};

module.exports = {
  ERROR_MESSAGES,
};
