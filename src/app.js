const express = require('express');
const config = require('./config');

const app = express();

app.use(config);

module.exports = app;
