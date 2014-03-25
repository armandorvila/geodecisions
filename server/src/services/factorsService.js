var Factor = require('../../src/models/factorsModel');

exports.findFactors = function(callback) {
    console.log('Getting all factors');
    Factor.find(function(err, factors) {
        if (err) {
            console.log(err);
        }
        callback(err, factors);
    });
};

exports.findFactorsByName = function(term, callback) {
    console.log('Getting factors by name ' + term);
    Factor.find({
        name : new RegExp(term + '.*','i')
    }, function(err, factors) {
        if (err) {
            throw new Error(err);
        }
        callback(err,factors);
    });
};

exports.createFactor = function(tag, callback) {
    
};