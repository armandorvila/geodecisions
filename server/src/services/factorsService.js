var Factor = require('../../src/models/factorsModel');

exports.findFactors = function(from, to, callback) {
    console.log('Getting factors from ' + from + ' ' + to);
    
    var fromZero = from - 1;
    
    Factor.find().sort({
        name : 'asc'
    }).limit(to - fromZero).skip(fromZero).exec(function(err, factors) {
        if (err) {
            console.log(err);
        }
        callback(err, factors);
    });
};

exports.countFactors = function(callback) {
    console.log('Counting all factors');
    
    Factor.count(function(err, count) {
        if (err) {
            console.log(err);
        }
        callback(err, count);
    });
};

exports.findFactorsByName = function(term, callback) {
    console.log('Getting factors by name ' + term);
    Factor.find({
        name : new RegExp(term + '.*', 'i')
    }, function(err, factors) {
        if (err) {
            throw new Error(err);
        }
        callback(err, factors);
    });
};

exports.findFactorByName = function(nameToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        name : nameToFind
    }));
    Factor.findOne(criteria).exec(function(err, process) {
        if (err) {
            throw new Error(err);
        }
        callback(err, process);
    });
};

exports.createFactor = function(factor, callback) {
    // TODO validate factor name is unique
    
    var newFactor = new Factor(factor);
    console.log('Creating factor ' + newFactor._id);
    
    newFactor.save(function(err) {
        if (err) {
            console.log('Error creating factor :' + err);
        }
        callback(err);
    });
};