var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var usersService = require('../../src/services/usersService');

/* ***************** Node module with all UserService tests**********************/

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

	findUsers : function(test) {
		console.log(' Test - UsersService.findUsers');
		
		test.expect(3);

		usersService.findUsers(function(err,result) {
			test.ok(result);
			test.ok(result[0]);
			test.equal(result[0].name, 'John');
			console.log('Got users ' + result);
			test.done();
		});
	},

	findByName : function(test) {
		console.log(' Test - UsersService.findByName');
		
		test.expect(3);
		usersService.findByName('Forrest', function(result) {
			test.ok(result);
			test.ok(result.name);
			test.equal(result.name, 'Forrest');
			console.log('Got user ' + result);
			test.done();
		});

	},

	createUser : function(test) {
		console.log(' Test - UsersService.createUser');
		
		usersService.createUser({
			name : 'Juan',
			lastname : 'Doe',
			email : 'doe@nodemola.com'
		},function(err){});
		test.done();
	},

	tearDown : function(callback) {
		mongodbFs.stop();
		mongoose.disconnect(callback);
		console.log('disconnect');
	}

};
