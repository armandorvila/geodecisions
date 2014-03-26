var request = require('supertest');
var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');
var express = require('express');

var route = require('../../src/routes/processesRoute');

var app = express();
var config = require('../../config');

route.addRoutes(app, config);

module.exports = {
    
    setUp : function(callback) {
        mongodbFs.init(dbconfig);
        console.log('Fs Mongo db initiazlized');
        
        mongodbFs.start(function(err) {
            mongoose.connect('mongodb://localhost:27027/fakedb', {
                server : {
                    poolSize : 3
                }
            }, function(err) {
                callback();
            });
        });
    },
    
    getProcesses : function(test) {
        
        console.log(' Test - processesRoute.getProcesses');
        
        test.expect(2);
        
        request(app)
                .get('/processes/get')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    
                    test.ok(res);
                    test.ok(res.body);
                    
                    test.done();
                });
    },
    
    getProcessByName : function(test) {
        
        console.log(' Test - processesRoute.getProcessByName');
        
        test.expect(2);
        
        request(app)
                .get('/processes/getByName/New Business')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    
                    test.ok(res);
                    test.ok(res.body);
                    
                    test.done();
                });
    },
    
    getProcessById : function(test) {
        
        console.log(' Test - processesRoute.getProcessById');
        
        test.expect(2);
        
        request(app)
                .get('/processes/getById/1')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
           
                    test.ok(res);
                    test.ok(res.body);
                    
                    test.done();
                });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }

};