var express = require('express');
var passport = require("passport");
var usersService = require('../services/usersService');

exports.addRoutes = function(app, config) {
    
    console.log('Loading route for users rest services');
    
    app.get('/users/get', function(req, res, next) {
        
        console.log('Request recieved users/get ' + req.body);
        
        usersService.findUsers(function(err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    });
    
    app.post('/users/create', function(req, res, next) {
        console.log('Request recieved ' + req);
        
        usersService.createUser(req.body, function callback(err) {
            if (err) {
                console.log('Error saving user :' + err);
                res.send(500);
            } else {
                res.send(200);
            }
        });
    });
    
    /**
     * if (user) { req.login(user, function(err) { if (err) { return
     * next(err); } console.log('User well stored in session');
     * res.json(user); }); } else { return err; }
     */
    
    app.post("/users/login", function(req, res, next) {
        return passport.authenticate('local', function(err, user, info) {
            console.log(' User logued : ' + user + ' info: ' + info.message);
            
            if (user) {
                req.login(user, function(err) {
                    if (err) {
                        return next(err);
                    }
                    console.log('User well stored in session');
                    res.json({
                        result : user,
                        message : info.message
                    });
                });
            }
            else {
                res.json({
                    result : user,
                    message : info.message
                });
            }
            
        })(req, res, next);
    });
    
    app.get('/users/current', function(req, res) {
        if (req.user) {
            res.json(req.user);
        } else {
            console.log('Not current user in req');
            res.json({
                user : false
            });
        }
    });
    
    app.post('/users/logout', function(req, res) {
        req.logout();
        res.send(200);
    });
};