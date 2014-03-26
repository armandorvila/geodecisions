var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var User = process.env.QUICKSORT_COV ? require('../../src-cov/models/usersModel')
        : require('../../src/models/usersModel');

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
    
    find : function(test) {
        
        console.log(' Test - UsersModel.find');
        
        test.expect(3);
        
        User.find(function(err, users) {
            if (err) {
                console.log(err);
            }
            test.ok(users);
            test.ok(users[0]);
            test.equal(users[0].name, 'Forrest');
            test.done();
        });
    },
    
    testfindOne : function(test) {
        console.log(' Test - UsersModel.findOne');
        
        User.findOne({
            'name' : 'Armando'
        }, 'name lastname', function(err, user) {
            if (err) {
                throw new Error(err);
            }
            test.ok(user);
            test.equal(user.name, 'Armando');
            test.done();
        });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }
};