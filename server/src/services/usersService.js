var User = require('../../src/models/usersModel');

exports.findUsers = function(callback) {
    console.log('Getting users at usersService.findUsers');
    User.find(function(err, users) {
        if (err) {
            console.log(err);
            callback(err, users);
        }
        callback(err, users);
    });
};

exports.createUser = function(user, callback) {
    //TODO validate email is unique
    new User(user).save(function(err) {
        if (err) {
            console.log('Error saving user :' + err);
        }
        callback(err);
    });
};

exports.findByName = function(nameToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        name : nameToFind
    }));
    
    User.findOne(criteria, 'name lastname email admin', function(err, user) {
        if (err) {
            console.log('error');
        }
        callback(err, user);
    });
};

exports.findByEmail = function(emailToFind, callback) {
    var criteria = JSON.parse(JSON.stringify({
        email : emailToFind
    }));
    
    User.findOne(criteria, 'name lastname email admin password', function(err, user) {
        if (err) {
            console.log(err);
        }
        callback(err, user);
    });
};