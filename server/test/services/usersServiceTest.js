var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var usersService = process.env.QUICKSORT_COV ? require('../../src-cov/services/usersService')
        : require('../../src/services/usersService');

/* ***************** Node module with all UserService tests********************* */

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
    
    findUsers : function(test) {
        console.log(' Test - UsersService.findUsers');
        
        test.expect(4);
        
        usersService.findUsers(function(err, result) {
            test.ok(result);
            test.ok(result[0]);
            test.equal(result[0].name, 'Forrest');
            test.equal(result[0].email, 'forrest@geodecisions.com');
            console.log('Got users ' + result);
            test.done();
        });
    },
    
    findByName : function(test) {
        console.log(' Test - UsersService.findByName');
        
        test.expect(4);
        usersService.findByName('Forrest', function(err, result) {
            test.ok(result);
            test.ok(result.name);
            test.equal(result.name, 'Forrest');
            test.equal(result.email, 'forrest@geodecisions.com');
            console.log('Got user ' + result);
            test.done();
        });
        
    },
    
    findByEmail : function(test) {
        console.log(' Test - UsersService.findByEmail');
        
        test.expect(4);
        usersService.findByEmail('forrest@geodecisions.com', function(err, result) {
            test.ok(result);
            test.ok(result.name);
            test.equal(result.name, 'Forrest');
            test.equal(result.email, 'forrest@geodecisions.com');
            console.log('Got user ' + result);
            test.done();
        });
        
    },
    
    createUser : function(test) {
        console.log(' Test - UsersService.createUser');
        
        usersService.createUser({
            _id : '43',
            name : 'Juan',
            lastname : 'Doe',
            email : 'doe@nodemola.com',
            password : 'doe@nodemola.com'
        }, function(err) {
            
        });
        test.done();
        
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }

};
