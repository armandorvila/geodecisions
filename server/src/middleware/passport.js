var passport = require("passport");
var passportConfig = require('../security/passportConfig');

var LocalStrategy = require('passport-local').Strategy;

/**
 * passport.use must be called after all middleware but before tracer and router.
 */
exports.use = function(app, config) {
	console.log('Loading Express passport midleware');

	passportConfig.configure(passport, LocalStrategy);

	app.use(passport.initialize());
	app.use(passport.session());
};