var express = require('express');
var tagsService = require('../services/tagsService');

exports.addRoutes = function(app, config) {
    console.log('Loading route for tags rest services');
    
    app.get('/tags/get/:name', function(req, res, next) {
        console.log('Getting tags');
        
        tagsService.findTags(req.params.name, function(err, tags) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(tags);
        });      
    });
};