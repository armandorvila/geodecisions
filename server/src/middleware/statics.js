var express = require('express');

/**
 * statics must be called prior all middleware.
 */
exports.use = function(app, config) {
	
  console.log('Loading Express static midleware');
	
  app.use(express.favicon(config.server.distFolder + config.server.staticUrl + '/favicon.ico'));
  app.use(config.server.staticUrl, express.compress());
  
  app.use(config.server.staticUrl, express.static(config.server.distFolder + config.server.staticUrl));
  app.use(config.server.templatesUrl, express.static(config.server.distFolder + config.server.templatesUrl));
  
  app.use(config.server.staticUrl, function(req, res, next) {
    res.send(404);
  });
};