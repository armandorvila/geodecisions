var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var User = require('../../src/models/usersModel');

module.exports = {

	setUp : function(callback) {
		mongodbFs.init(dbconfig);
		console.log('Fs Mongo db initiazlized');

		mongodbFs.start(function(err) {
			mongoose.connect('mongodb://localhost:27027/fakedb', {
				server : {
					poolSize : 1
				}
			}, function(err) {
				callback();
			});
		});
	},

	find : function(test) {

		console.log(' Test - UsersModel.find');

		test.expect(3);

		User.find(function(err, users) {
			if (err) {
				console.log(err);
			}
			test.ok(users);
			test.ok(users[0]);
			test.equal(users[0].name, 'John');
			test.done();
		});
	},

	testfindOne : function(test) {
		console.log(' Test - UsersModel.findOne');

		User.findOne({
			'name' : 'John'
		}, 'name lastname', function(err, user) {
			if (err) {
				throw new Error(err);
			}
			test.ok(user);
			test.equal(user.name, 'John');
			test.done();
		});
	},

	tearDown : function(callback) {
		mongodbFs.stop();
		mongoose.disconnect(callback);
		console.log('disconnect');
	}
};