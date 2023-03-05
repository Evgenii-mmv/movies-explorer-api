require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { MESSAGE } = require('./code_answer/code_answer');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const { createUser, login } = require('./controllers/user');
const validator = require('./validation/validation');
const { dburl } = require('./constants/const');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', true);
mongoose.connect(dburl);
// console.log('createUser', createUser);
// console.log('validator.validateUserReg()', validator.validateUserReg());
app.use(requestLogger);
app.use(cors);
app.post('/signin', validator.validateUserLog(), login);
app.post('/signup', validator.validateUserReg(), createUser);

app.use(auth);
app.use('/', require('./routes/noneexistent'));
app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? MESSAGE.DEFAULT : err.message;
  res
    .status(statusCode)
    .send({ message });

  return next();
});

app.listen(PORT);
