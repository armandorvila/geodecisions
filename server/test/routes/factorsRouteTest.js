var request = require('supertest');
var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');
var express = require('express');

var route = require('../../src/routes/factorsRoute');

var app = express();
app.use(express.bodyParser());

var config = require('../../config');

route.addRoutes(app, config);

var newFactor = {
        name : 'Incendios',
        description : 'Incendios decision factor',
        layers : ['MADRID_PUBLIC_GIS_LAYER_CODE'],
        scope : 'Local'
    };

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
    
//    createFactor: function(test){
//        console.log('Testing create factor route');
//   
//        request(app).post('/factors/create').send(newFactor).expect('Content-Type', /json/).expect(200).end(function(err, res) {
//            if (err) {
//                throw err;
//            }
//            test.ok(res);
//            test.done();
//        });
//    },
    
//    getFactors : function(test) {
//        request(app).get('/factors/get/1/5').expect('Content-Type', /json/).expect(200).end(function(err, res) {
//            if (err) {
//                throw err;
//            }
//            test.ok(res);
//            test.done();
//        });
//    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }

};