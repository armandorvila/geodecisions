var path = require('path');

module.exports = {
		
  mongo: {
    url: 'mongodb://heroku_app23097767:vecf6kaqm7nhhn5qfcfhphcf0t@ds031359.mongolab.com:31359/heroku_app23097767'
  },
  
  security: {
	dbUser:'heroku_app23097767',
    dbName: 'heroku_app23097767',                   	// The name of database that contains the security information
    usersCollection: 'geodecisions.users'                            // The name of the collection contains user information
  },
  
  server: {
	port: process.env.PORT || 5000,                                   // The port on which the server is to listen (means that the app is at http://localhost:3000 for instance)
    securePort: 8433,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8433 for instance)
    distFolder: path.resolve(__dirname, '../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
    staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
    cookieSecret: 'geodecisions'                         // The secret for encrypting the cookie
  }
};