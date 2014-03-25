var express = require('express');
var factorsService = require('../services/factorsService');

exports.addRoutes = function(app, config) {
    console.log('Loading route for factors rest services');
    
    app.get('/factors/get', function(req, res, next) {
        console.log('Getting factors');
        
        factorsService.findFactors(function(err, factors) {
            if (err) {
                res.send(err);
            }
            res.json(factors);
        });        
    });
    
    app.get('/factors/getByName/:name', function(req, res, next) {
        console.log('Getting factors');
        
        factorsService.findFactorsByName(req.params.name, function(err, factors) {
            if (err) {
                res.send(err);
            }
            res.json(factors);
        });        
    });
};


