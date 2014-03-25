var request = require('supertest');
var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');
var express = require('express');

var route = require('../../src/routes/tagsRoute');

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
    
    getTags : function(test) {
        request(app)
                .get('/tags/get/Ca')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(
                        '[\n  {\n    "_id": "1",\n    "name": "Cars"\n  },\n  {\n    "name": "Houses"\n  },\n  {\n    "_id": "3",\n    "name": "Banks"\n  },\n  {\n    "_id": "4",\n    "name": "Holidays"\n  }\n]')
                .end(function(err, res) {
                    if (err) {
                        throw err;
                    }
                    test.ok(res);
                    test.done();
                });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }

};