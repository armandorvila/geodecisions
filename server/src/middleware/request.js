var express = require('express');

/**
 * tracer.use must be called after statics and before session.
 */
exports.use = function(app, config) {
	
	console.log('Loading Express request midleware (Express logger, bodyParser and cookieParser)');
	
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.cookieParser(config.server.cookieSecret)); 
};