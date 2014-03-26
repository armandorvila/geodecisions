var express = require('express');
var RedisStore = require('connect-redis')(express);

/**
 * session.use must be called after prior passport
 */
exports.use = function(app, config) {
    console.log('Loading Express session midleware');
    
    app.use(express.session({
        secret : config.server.cookieSecret,
        maxAge  : new Date(Date.now() + 3600000), //1 Hour
        expires : new Date(Date.now() + 3600000), //1 Hour
        store : new RedisStore({
            host : config.redis.host,
            port : config.redis.port,
            user : config.redis.user,
            pass : config.redis.pass
        }),
        cookie : {
            maxAge : 604800, // one week
            httpOnly : false,
            secure : false
        }
    }));
};