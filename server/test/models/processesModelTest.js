var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var Process = require('../../src/models/usersModel.js');
var Process = require('../../src/models/factorsModel.js');
var Process = require('../../src/models/tagsModel.js');
var Process = require('../../src/models/processesModel.js');

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
        
        console.log(' Test - ProcessesModel.find');
        
        test.expect(3);
        
        Process.find(function(err, processes) {
            if (err) {
                console.log(err);
            }
            test.ok(processes);
            test.ok(processes[0]);
            test.equal(processes[0].name, 'New Business');
            test.done();
        });
    },
    
    testfindOne : function(test) {
        console.log(' Test - ProcessesModel.findOne');
        
        test.expect(14);
        
        Process.findOne({
            name : 'New Business'
        }).populate('user').populate('factors').populate('tags').exec(function(err, process) {
            if (err) {
                throw new Error(err);
            }
            test.ok(process);
            test.ok(process.name);
            
            test.ok(process.user);
            test.ok(process.user.name);
            
            test.ok(process.tags);
            test.ok(process.tags[0]);
            
            test.ok(process.factors);
            test.ok(process.factors[0]);
            
            test.equal('Forrest', process.user.name);
            
            test.equal(2, process.factors.length);
            test.equal(2, process.tags.length);
            
            test.equal(process.name, 'New Business');
            test.equal(process.factors[0].name, 'Demography');
            test.equal(process.tags[0].name, 'Cars');
            
            test.done();
        });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }
};