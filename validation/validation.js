const { Joi, celebrate } = require('celebrate');
const regexp = require('../constants/const');

exports.validateMoviePost = () => celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.stirng().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexp.RegExp),
    trailerLink: Joi.string().required().pattern(regexp.RegExp),
    thumbnail: Joi.string().required().pattern(regexp.RegExp),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

exports.validateUserReg = () => celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

exports.validateUserPatch = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

exports.validateUserLog = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

exports.validateMovieDelete = () => celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
