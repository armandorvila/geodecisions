var express = require('express');
var Project = require('../models/projectsModel');

exports.addRoutes = function(app, config) {

	app.get('/projects/get', function(req, res, next) {

		console.log('Getting projects');

		Project.find(function(err, projects) {

			if (err) {
				console.log(err);
				res.send(err);
			}

			res.json(projects);
			res.end();
		});

	});
};