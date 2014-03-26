var mongoose = require('mongoose');
var mongodbFs = require('mongodb-fs');
var dbconfig = require('../dbconfig');

var Tag = process.env.QUICKSORT_COV ? require('../../src-cov/models/tagsModel')
        : require('../../src/models/tagsModel');

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
        
        console.log(' Test - TagsModel.find');
        
        test.expect(3);
        
        Tag.find(function(err, tags) {
            if (err) {
                console.log(err);
            }
            test.ok(tags);
            test.ok(tags[0]);
            test.equal(tags[0].name, 'Cars');
            test.done();
        });
    },
    
    testfindOne : function(test) {
        console.log(' Test - TagsModel.findOne');
        
        Tag.findOne({
            'name' : 'Houses'
        }, 'name', function(err, tag) {
            if (err) {
                throw new Error(err);
            }
            test.ok(tag);
            test.equal(tag.name, 'Houses');
            test.done();
        });
    },
    
    testFindAnyMatch : function(test) {
        console.log(' Test - TagsModel.testFindAnyMatch');
        //mongo fs dosen't support regex based queries
        Tag.find({
            name : /Ho/i
        }, function(err, tags) {
            if (err) {
                throw new Error(err);
            }
            test.ok(tags);
            test.ok(tags[0]);
            test.ok(tags[1]);
          
            console.log('Tags :' +  JSON.stringify(tags));
            
            test.done();
        });
    },
    
    tearDown : function(callback) {
        mongodbFs.stop();
        mongoose.disconnect(callback);
        console.log('disconnect');
    }
};