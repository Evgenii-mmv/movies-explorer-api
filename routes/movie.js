const router = require('express').Router();
const { errors } = require('celebrate');

const validator = require('../validation/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movie');

router.post('/', validator.validateMoviePost(), createMovie);
router.get('/', getMovies);
router.delete('/:id', validator.validateMovieDelete(), deleteMovie);

router.use(errors());

module.exports = router;
