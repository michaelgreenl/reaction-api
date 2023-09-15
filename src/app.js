
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const { FRONTEND_URL } = process.env;
app.use(cors({ origin: FRONTEND_URL }));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(routes);

module.exports = app;