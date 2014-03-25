var express = require('express');

/**
 * router.use must be called after all middleware.
 */
exports.use = function(app, config) {
    
    console.log('Loading Express router midleware and routes');
    
    app.use(app.router);
    
    require('../routes/usersRoute').addRoutes(app, config);
    require('../routes/tagsRoute').addRoutes(app, config);
    require('../routes/factorsRoute').addRoutes(app, config);
    require('../routes/processesRoute').addRoutes(app, config);
    
    // SPA entry point, after all routes
    require('../routes/indexRoute').addRoutes(app, config);
    
    // After router middleware and routes
    app.use(express.errorHandler({
        dumpExceptions : true,
        showStack : true
    }));
    
};