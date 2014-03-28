var User = require('../../src/models/usersModel');
var Tag = require('../../src/models/tagsModel');
var Factor = require('../../src/models/factorsModel');
var Process = require('../../src/models/processesModel');

exports.findProcesses = function(callback) {
    Process.find(function(err, processes) {
        if (err) {
            console.log(err);
        }
        callback(err, processes);
    });
};

exports.findProcessesByUser = function(userId, callback) {
    var criteria = JSON.parse(JSON.stringify({
        user : userId
    }));
    Process.find(criteria).populate('factors').populate('tags').exec(function(err, processes) {
        if (err) {
            throw new Error(err);
        }
        callback(err,processes);
    });
};

exports.findProcessByName = function(nameToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        name : nameToFind
    }));
    Process.findOne(criteria).populate('user').populate('factors').populate('tags').exec(function(err, process) {
        if (err) {
            throw new Error(err);
        }
        callback(err,process);
    });
};

exports.findProcessById= function(_idToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        _id : _idToFind
    }));
    Process.findOne(criteria).populate('user').populate('factors').populate('tags').exec(function(err, process) {
        if (err) {
            throw new Error(err);
        }
        callback(err,process);
    });
};
    
exports.createProcess = function(process, callback) {
    var newProcess = new Process(process);
    console.log('Creating process ' + newProcess._id);
    
    newProcess.save(function(err) {
        if (err) {
            console.log('Error creating process :' + err);
        }
        callback(err, newProcess);
    });
};