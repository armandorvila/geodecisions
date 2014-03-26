var express = require('express');
var factorsService = require('../services/factorsService');

exports.addRoutes = function(app, config) {
    console.log('Loading route for factors rest services');
    
    app.get('/factors/get/:from/:to', function(req, res, next) {
        console.log('/factors/get/:from/:to');
        
        factorsService.findFactors(req.params.from, req.params.to, function(err, factors) {
            if (err) {
                res.send(err);
            }
            res.json(factors);
        });        
    });
    
    app.get('/factors/count', function(req, res, next) {
        console.log('/factors/count');
        
        factorsService.countFactors(function(err, count) {
            if (err) {
                res.send(err);
            }
            res.json(count);
        });        
    });
    
    app.post('/factors/create', function(req, res, next) {
        console.log('Recived request /factors/create ');

        factorsService.createFactor(req.body, function callback(err) {
            if (err) {
                console.log('Error saving factor :' + err);
                res.send(500);
            } else {
                console.log('Factor created');
                res.send(200);
            }
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


