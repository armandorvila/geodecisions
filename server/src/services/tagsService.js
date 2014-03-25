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

exports.createTag = function(tag, callback) {

};