var Tag = require('../../src/models/tagsModel');

exports.findTags = function(term, callback) {
    Tag.find({
        name : new RegExp('^' + term + '.*','i')
    }, function(err, tags) {
        if (err) {
            throw new Error(err);
        }
        callback(err,tags);
    });
};

exports.findTagByName = function(nameToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        name : nameToFind
    }));
    Tag.findOne(criteria).exec(function(err, process) {
        if (err) {
            throw new Error(err);
        }
        callback(err,process);
    });
};

exports.createTag = function(tag, callback) {
// TODO validate factor name is unique
    
    var newTag = new Tag(tag);
    console.log('Creating factor ' + newTag._id);
    
    newTag.save(function(err) {
        if (err) {
            console.log('Error creating tag :' + err);
        }
        callback(err, newTag);
    });
};