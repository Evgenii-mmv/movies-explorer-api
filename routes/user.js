const router = require('express').Router();
const { errors } = require('celebrate');
const validator = require('../validation/validation');
const { updateProfile, getMyProfile } = require('../controllers/user');

router.patch('/me', validator.validateUserPatch(), updateProfile);
router.get('/me', getMyProfile);

router.use(errors());
module.exports = router;
