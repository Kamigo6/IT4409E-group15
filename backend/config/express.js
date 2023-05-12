const express = require("express");
var morgan = require('morgan');
const bodyParser = require("body-parser");
const routes = require('../routes/index');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;