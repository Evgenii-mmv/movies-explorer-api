const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const { MESSAGE } = require('../code_answer/code_answer');
const { Unauthorized } = require('../error/unauthorized');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      return validator.isEmail(value);
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(MESSAGE.INCORRECT_PAS_OR_LOG);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(MESSAGE.INCORRECT_PAS_OR_LOG);
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
