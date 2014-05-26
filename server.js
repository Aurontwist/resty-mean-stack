// server.js

// load modules ===============================================

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// Configuratipn ===============================================
app.use(bodyParser());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

var db = require('./config/db');
mongoose.connect(db.url);

var port = process.env.PORT || 8080;

// Routes ===============================================

require('./app/api-routes')(app);
require('./app/routes')(app);

// apiRouter = require('./app/api-routes')(app);

// Start App ===============================================

app.listen(port);
console.log('Magic happend on port: ' + port);