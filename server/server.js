var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var config = require('./config.js');

var app = express();

require('./src/routes/static').addRoutes(app, config);

app.use(express.logger());                                  
app.use(express.bodyParser());                              
app.use(express.cookieParser(config.server.cookieSecret)); 
app.use(express.cookieSession());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

require('./src/routes/users').addRoutes(app, config);
require('./src/routes/projects').addRoutes(app, config);

require('./src/routes/home').addRoutes(app, config);


mongoose.connect(config.mongo.url); 
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

http.createServer(app).listen(config.server.port, '0.0.0.0', 511, function() {
	console.log('Geodecisions App Server - listening on port: ' + config.server.port);
});