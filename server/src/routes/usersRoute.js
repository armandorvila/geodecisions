var express = require('express');
var usersService = require('../services/usersService');

exports.addRoutes = function(app, config) {

	app.get('/users/get', function(req, res, next) {

		console.log('Request recieved ' + req);

		usersService.findUsers(function(err, result) {
			if (err) {
				res.send(err);
			}
			res.json(result);
			res.end();
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
};