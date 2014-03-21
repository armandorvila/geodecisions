var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var usersService = require('../services/usersService');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.email);
	});

	passport.deserializeUser(function(email, done) {
		usersService.findByEmail(email, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password'
	},

	function(email, password, done) {
		console.log('Starting pssport authentication for' + email);
		usersService.findByEmail(email, function(err, user) {
			if (err) {
				console.log('Error doing login for ' + email);
				return done(err);
			}
			if (!user) {
				console.log('No user found with email ' + email);
				return done(null, false, {
					message : 'Incorrect email.'
				});
			}

			if (password === user.password) {
				console.log('User logued ' + user.email);

				var userCookie = {
					id : user.id,
					email : user.email
				};

				return done(null, userCookie);
			} else {
				console.log('Incorrect password');
				done(null, false, {
					message : 'Incorrect password'
				});
			}
		});
	}));
};