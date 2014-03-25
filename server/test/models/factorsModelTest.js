var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var Factor = require('../../src/models/factorsModel');

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
        
        console.log(' Test - FactorsModel.find');
        
        test.expect(3);
        
        Factor.find(function(err, factors) {
            if (err) {
                console.log(err);
            }
            test.ok(factors);
            test.ok(factors[0]);
            test.equal(factors[0].name, 'Demography');
            test.done();
        });
    },
    
    testfindOne : function(test) {
        console.log(' Test - FactorsModel.findOne');
        
        Factor.findOne({
            'name' : 'Unemployment'
        }, 'name', function(err, factor) {
            if (err) {
                throw new Error(err);
            }
            test.ok(factor);
            test.equal(factor.name, 'Unemployment');
            test.done();
        });
    },
    
    testFindAnyMatch : function(test) {
        console.log(' Test - FactorsModel.testFindAnyMatch');
        //mongo fs dosen't support regex based queries
        Factor.find({
            name : /Un/i
        }, function(err, factors) {
            if (err) {
                throw new Error(err);
            }
            test.ok(factors);
            test.ok(factors[0]);
          
            console.log('Factors :' +  JSON.stringify(factors));
            
            test.done();
        });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }
};