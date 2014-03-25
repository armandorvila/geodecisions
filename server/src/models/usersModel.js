var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    _id : {
        type : String,
        required : false
    },
    name : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('User', userSchema , 'geodecisions_users');