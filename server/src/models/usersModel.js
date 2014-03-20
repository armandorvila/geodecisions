var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	name : String,
	lastname : String,
	email : String,
	password: String
}, 'geodecisions_users');