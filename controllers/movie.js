const Movie = require('../models/movie');
const { CODE, MESSAGE } = require('../code_answer/code_answer');
const { NotFoundError } = require('../error/notfound');
const { Forbidden } = require('../error/forbidden');
const { BadRequest } = require('../error/badrequest');
const { CastError } = require('../error/casterror');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerr = req.user.id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerr,
  })
    .then((movie) => res.status(CODE.CREATED).send({ movie }))
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return next(new BadRequest(MESSAGE.BAD_REQUEST));
      }

      return next(e);
    });
};

const getMovies = (req, res, next) => {
  const ownerr = req.user.id;
  Movie.find({ owner: ownerr })
    .then((movies) => res.status(CODE.OK).send({ movies }))
    .catch((e) => next(e));
};

// const deleteMovie = (req, res, next) => Movie.findOneAndRemove(req.params.id)
//   .populate('owner')
//   .then((movie) => {
//     console.log(req.params.id);
//     console.log(String(movie.owner._id));
//     console.log(req.user.id);
//     if (!movie) {
//       return next(new NotFoundError(MESSAGE.NOT_FOUND));
//     }
//     if (String(movie.owner._id) !== req.user.id) {
//       return next(new Forbidden(MESSAGE.FORBIDDEN));
//     }
//     return res.status(CODE.OK).send({ movie });
//   })
//   .catch((e) => {
//     console.log(e);
//     if (e.name === 'CastError') {
//       return next(new CastError(MESSAGE.CAST_ERROR));
//     }
//     return next(e);
//   });

const deleteMovie = (req, res, next) => Movie.findById(req.params.id)
  .populate('owner')
  .then((movie) => {
    console.log(req.params.id);
    console.log(String(movie.owner._id));
    console.log(req.user.id);
    if (!movie) {
      console.log('notFound');
      return next(new NotFoundError(MESSAGE.NOT_FOUND));
    }
    if (String(movie.owner._id) !== req.user.id) {
      console.log('forbidden');
      return next(new Forbidden(MESSAGE.FORBIDDEN));
    }
    movie.deleteOne();
    return res.status(CODE.OK).send({ movie });
  })
  .catch((e) => {
    console.log(e);
    if (e.name === 'CastError') {
      return next(new CastError(MESSAGE.CAST_ERROR));
    }
    return next(e);
  });

module.exports = {
  deleteMovie,
  getMovies,
  createMovie,
};
