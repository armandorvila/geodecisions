var express = require('express');
var usersService = require('../services/usersService');
var passport = require("passport");

exports.addRoutes = function(app, config) {

	app.get('/users/get', function(req, res, next) {

		console.log('Request recieved users/get ' + req.body);

		usersService.findUsers(function(err, result) {
			if (err) {
				res.send(err);
			} else {
				res.json(result);
				res.end();
			}
		});
	});

	app.post('/users/create', function(req, res, next) {
		console.log('Request recieved ' + req);

		usersService.createUser(req.body, function callback(err) {
			if (err) {
				console.log('Error saving user :' + err);
				res.send(500);
			} else {
				res.send(200);
			}
		});
	});

	app.post("/login", function(req, res, next) {
		
		return passport.authenticate('local', function(err, user) {
			res.json(user);
			res.end();
		})(req, res, next);
		
		
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/home');
	});
};