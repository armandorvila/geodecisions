var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var config = require('./config.js');

//Express framework middle ware configuration
var statics = require('./src/middleware/statics');
var request = require('./src/middleware/request');
var session = require('./src/middleware/session');
var passport = require('./src/middleware/passport');
var tracer = require('./src/middleware/tracer');
var router = require('./src/middleware/router');

console.log('---------- Middleware imported ----------');

var app = express();

statics.use(app, config);
request.use(app, config);
session.use(app, config);
passport.use(app, config);
tracer.use(app, config);
router.use(app, config);

console.log('----------- Middleware loaded ----------');

mongoose.connect(config.mongo.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

console.log('----------- Mongo db connection ready ----------');

var server = http.createServer(app);

var io = require('socket.io').listen(server, { log: false });
//var context = require("rabbit.js").createContext(config.rabbitmq.url);

//var stream = require('./src/stream/stream')(io, context, config);

server.listen(config.server.port, '0.0.0.0', 511, function() {
    console.log('Geodecisions App Server - listening on port: ' + config.server.port);
});
