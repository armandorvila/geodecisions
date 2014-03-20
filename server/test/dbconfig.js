var path = require('path');
var util = require('util');

module.exports = {
		  port: 27027, 
		  mocks: { 
			  fakedb : {
					geodecisions_users : [ {
						name : 'John',
						lastname : 'Doe'
					}, {
						name : 'Forrest',
						lastname : 'Gump'
					} ]
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

