var fs = require('fs');

var http = require('http');

var express = require('express');

var mongoProxy = require('./src/mongo/mongoProxy');
var config = require('./src/mongo/mongoConfig.js');


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

var routes = require('./src/routes');
app.get('/', routes.index);


app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

server.listen(config.server.listenPort, '0.0.0.0', 511, function() {

});

console.log('Geodecisions App Server - listening on port: ' + config.server.listenPort);