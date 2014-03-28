var express = require('express');
var tagsService = require('../services/tagsService');

exports.addRoutes = function(app, config) {
    console.log('Loading route for tags rest services');
    
    app.get('/tags/get/:name', function(req, res, next) {
        console.log('Recieved request /tags/get/:name');
        
        tagsService.findTags(req.params.name, function(err, tags) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(tags);
        });
    });
    
    app.get('/tags/getByName/:name', function(req, res, next) {
        console.log('Recieved request /tags/getByName/:name');
        
        tagsService.findTagByName(req.params.name, function(err, tag) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(tag);
        });
    });
    
    app.post('/tags/create', function(req, res, next) {
        console.log('Recieved request /tags/create');
        tagsService.createTag(req.body, function(err, tag) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(tag);
        });
    });
};