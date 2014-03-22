var mongoose = require('mongoose');
var usersService = require('../services/usersService');

exports.configure = function(passport, LocalStrategy) {

	/**
	 * Tell passport what information store in session.
	 */
	passport.serializeUser(function(user, done) {
		console.log(' Storing ' + user.email + ' in the passsport session.');
		done(null, user.email);
	});

	/**
	 * Tell passport how get the user from the information stored in session.
	 */
	passport.deserializeUser(function(email, done) {
		console.log(' Restoring user ' + email + ' from the passsport session.');
		usersService.findByEmail(email, function(err, user) {
			done(err, user);
		});
	});

	/**
	 * Tell passport who is a valid user and who is not one.
	 */
	passport.use(new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password'
	}, function(email, password, done) {
		console.log('Starting pssport Local strategy for ' + email);
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

				return done(null, user);
			} else {
				console.log('Incorrect password');
				done(null, false, {
					message : 'Incorrect password'
				});
			}
		});
	}));
};