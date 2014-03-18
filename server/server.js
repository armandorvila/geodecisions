var express = require('express');
var fs = require('fs');
var http = require('http');
var mongoose = require('mongoose');
var mongoProxy = require('./src/mongo/mongoProxy');
var config = require('./config.js');


var passport = require('passport');

require('express-namespace');

var app = express();

var server = http.createServer(app);

var security = require('./src/security/security');
var protectJSON = require('./src/security/protectJSON');
var xsrf = require('./src/security/xsrf');


app.use(protectJSON);

app.use(express.logger());                                  // Log requests to the console
app.use(express.bodyParser());                              // Extract the data from the body of the request - this is needed by the LocalStrategy authenticate method

app.use(express.cookieParser(config.server.cookieSecret));  // Hash cookies with this secret
app.use(express.cookieSession());                           // Store the session in the (secret) cookie

app.use(passport.initialize());                             // Initialize PassportJS
app.use(passport.session());                                // Use Passport's session authentication strategy - this stores the logged in user in the session and will now run on any request

app.use(xsrf);                                            // Add XSRF checks to the request


require('./src/routes/users').addRoutes(app, config);
require('./src/routes/home').addRoutes(app, config);
require('./src/routes/static').addRoutes(app, config);

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));


mongoose.connect(config.mongo.url); 
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

server.listen(config.server.port, '0.0.0.0', 511, function() {
	console.log('Geodecisions App Server - listening on port: ' + config.server.port);
});

