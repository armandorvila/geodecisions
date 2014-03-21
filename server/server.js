var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var passport = require("passport");
var config = require('./config.js');
var RedisStore = require('connect-redis')(express);

require('./src/security/passportConfig')(passport);


var app = express();

require('./src/routes/staticsRoute').addRoutes(app, config);

app.use(express.logger());                                  
app.use(express.bodyParser());                              
app.use(express.cookieParser(config.server.cookieSecret)); 
//app.use(express.cookieSession());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

app.use(express.session({ 
	  secret: "y0urR4nd0mT0k3n", 
	  store : new RedisStore({ 
	    host : config.redis.host, 
	    port : config.redis.port, 
	    user : config.redis.user, 
	    pass : config.redis.pass 
	  }),
	  cookie : {
	    maxAge : 604800 // one week
	  }
}));

app.use(passport.initialize());
app.use(passport.session());





require('./src/routes/usersRoute').addRoutes(app, config);
require('./src/routes/projectsRoute').addRoutes(app, config);

require('./src/routes/homeRoute').addRoutes(app, config);


mongoose.connect(config.mongo.url); 
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

http.createServer(app).listen(config.server.port, '0.0.0.0', 511, function() {
	console.log('Geodecisions App Server - listening on port: ' + config.server.port);
});