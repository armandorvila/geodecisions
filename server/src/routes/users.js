var express = require('express');
var User = require('../models/users');

exports.addRoutes = function(app, config) {

	app.get('/users/get', function(req, res, next) {

		console.log('Getting users');

		User.find(function(err, users) {
			if (err) {
				console.log(err);
				res.send(err);
			}
			res.json(users);
			res.end();
		});
	});
	
	app.post('/users/create', function(req, res, next) {
		console.log('Creating user');
		
		var user = new User(req.body);
		
		user.save(function (err) {
			  if (err){
			  console.log('Error saving user :' + err);
			  }
			  res.send(err);
		});
		
		res.send(200);
	});
};