var mongoose = require('mongoose');


//var userSchema = mongoose.Schema({
//	name : String,
//	lastname : String,
//	email : String,
//	password: String
//});

module.exports = mongoose.model('User', {
	name : String,
	lastname : String,
	email : String,
	password: String
}, 'geodecisions_users');