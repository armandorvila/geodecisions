var express = require('express');
var processesService = require('../services/processesService');

exports.addRoutes = function(app, config) {
    console.log('Loading route for processes rest services');
    
    app.get('/processes/get', function(req, res, next) {
        console.log('Getting processes');
        
        processesService.findProcesses(function(err, processes) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(processes);
        });        
    });
    
    app.get('/processes/getByName/:name', function(req, res, next) {
        console.log('Getting processes');
        
        processesService.findProcessByName(req.params.name,function(err, process) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(process);
        });        
    });
    
    app.get('/processes/getById/:id', function(req, res, next) {
        console.log('Request recieved at /processes/getById/:id');
        
        processesService.findProcessById(req.params.id,function(err, process) {
            if (err) {
                console.log(err);
                res.send(err);
            }
            res.json(process);
        });        
    });
};