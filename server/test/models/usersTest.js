var rewire = require('rewire');
var security = rewire('../../src/models/security');

 var mongo = {
    url: 'ds031359.mongolab.com:31359/heroku_app23097767',
    dbUser:'heroku_app23097767',
    dbName: 'heroku_app23097767',                   	// The name of database that contains the security information
    usersCollection: 'geodecisions.users' 
};
 
 module.exports = {
		 
		 
 };