const RegExp = /^(?:http(s)?:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;
const JWT_SECRET = 'secret';
const dburl = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  JWT_SECRET,
  dburl,
  RegExp,
};
