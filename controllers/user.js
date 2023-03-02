const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { userRes } = require('../utilits/utilits');
const { CODE, MESSAGE } = require('../code_answer/code_answer');
const { BadRequest } = require('../error/badrequest');
const { JWT_SECRET } = require('../constants/const');

const getMyProfile = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      res.status(CODE.OK).send(userRes(user));
    })
    .catch((e) => {
      console.log(e);
      next(e);
    });
};

const updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(CODE.OK).send(userRes(user));
    }).catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE.BAD_REQUEST));
      }

      return next(e);
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(CODE.CREATED).send({ user }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE.BAD_REQUEST));
      }
      return next(e);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(CODE.OK).send({ token });
    }).catch((e) => next(e));
};

module.exports = {
  updateProfile,
  login,
  createUser,
  getMyProfile,
};
