const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../constants/const');
const { MESSAGE } = require('../code_answer/code_answer');
const { Unauthorized } = require('../error/unauthorized');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized(MESSAGE.NOTLOGIN));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new Unauthorized(MESSAGE.NOTLOGIN));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next();
};
