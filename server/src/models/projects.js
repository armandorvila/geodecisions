var mongoose = require('mongoose');

module.exports = mongoose.model('Project', {
	name : String,
	code : String,
	type : String,
	description: String
}, 'geodecisions.projects');