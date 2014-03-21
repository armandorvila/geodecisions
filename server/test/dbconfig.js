var path = require('path');
var util = require('util');

module.exports = {
		  port: 27027, 
		  mocks: { 
			  fakedb : {
					geodecisions_users : [{
						name : 'Forrest',
						lastname : 'Gump',
						email : 'forrest@geodecisions.com'
					},
					{
						name : 'Armando',
						lastname : 'Jaleo',
						email : 'armando@geodecisions.com'
					},
					{
						name : 'Kevin',
						lastname : 'Stuart',
						email : 'stuart@geodecisions.com'
					}
					]
				}
		  },
		 
		  fork: false,         // force the server to run in a separate process (default: false)


		  log: {
		    log4js: {  
		      appenders: [    
		        {
		          type: 'console',
		          category: path.basename(__filename)
		        }
		      ]
		    },
		    category: path.basename(__filename), 
		    level: 'INFO'                        
		  }
};

