path = require('path');

module.exports = {
	mongo : {
		url : 'mongodb://heroku_app23097767:vecf6kaqm7nhhn5qfcfhphcf0t@ds031359.mongolab.com:31359/heroku_app23097767'
	},
	redis : {
		host : 'pub-redis-19544.eu-west-1-1.1.ec2.garantiadata.com',
		port : '19544',
		user : 'rediscloud',
		pass : 'abmIgdAH7OSFBRF3'
	},
	security : {
		dbUser : 'heroku_app23097767',
		dbName : 'heroku_app23097767',

		usersCollection : 'geodecisions_users'
	},
	server : {
		port : process.env.PORT || 5000,
		distFolder : path.resolve(__dirname, '../client/dist'),
		staticUrl : '/resources',
		templatesUrl : '/templates',
		cookieSecret : 'geodecisions'
	}
};