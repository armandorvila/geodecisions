var User = require('../../src/models/usersModel');

exports.findUsers = function(callback) {
	console.log('Getting users');
	User.find(function(err, users) {
		if (err) {
			console.log(err);
			callback(err, users);
		}
		callback(err,users);
	});
};

exports.createUser = function(user, callback) {
	new User(user).save(function(err) {
		if (err) {
			console.log('Error saving user :' + err);
		}
		callback(err);
	});
};

exports.findByName = function(nameToFind, callback) {
	var criteria = JSON.parse(JSON.stringify({name : nameToFind}));
	
	User.findOne(criteria, 'name lastname', function(err, user) {
		if (err) {
			console.log('error');
			return callback(err);
		}
		console.log(user);
		callback(user);
	});
};