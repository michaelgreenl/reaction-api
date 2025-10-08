const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { cors } = require('./cors.config.js');
const { helmet } = require('./helmet.config.js');
const { limiter, speedLimiter } = require('./limiters.config.js');
const routes = require('../routes');

const config = [
  helmet,
  limiter,
  speedLimiter,
  cors,
  bodyParser.json(),
  cookieParser(),
  bodyParser.urlencoded({
    extended: true,
  }),
  routes,
];

module.exports = config;
