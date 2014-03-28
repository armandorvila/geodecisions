var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var ObjectId = mongoose.Schema.Types.ObjectId;

var processesService = process.env.QUICKSORT_COV ? require('../../src-cov/services/processesService')
        : require('../../src/services/processesService');

/* ***************** Node module with all UserService tests********************* */

var newProcess = {
        _id : '46',
        name : 'Process A',
        description : 'Doe',
        user : {
            _id : '1',
            name : 'Armando'
        },
        factors : ['13'],
        tags : ['1']
    };

module.exports = {
    
    setUp : function(callback) {
        mongodbFs.init(dbconfig);
        console.log('Fs Mongo db initiazlized');
        
        mongodbFs.start(function(err) {
            mongoose.connect('mongodb://localhost:27027/fakedb', {
                server : {
                    poolSize : 4
                }
            }, function(err) {
                callback();
            });
        });
    },
    
//    createProcess : function(test) {
//        console.log(' Test - processesService.createProcess');
//        
//        test.expect(2);
//        
//        processesService.createProcess(newProcess, function(err, process) {
//            console.log('Error creating process');
//            test.ifError(err);
//            test.ok(process);
//            test.done();
//        });
//        
//    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }

};
