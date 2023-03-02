const allowedCors = [
  'localhost:3000',
  'localhost:3001',
  'https://localhost:3000',
  'http://localhost:3001',
  'http://51.250.23.70:3000',
  'http://movies-explorer.diplom.nomoredomains.work:3000',
  'https://movies-explorer.diplom.nomoredomains.work:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  next();
  return Promise.resolve();
};
