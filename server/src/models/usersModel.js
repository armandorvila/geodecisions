var mongoose = require('mongoose');
var shortId = require('shortid');

var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = mongoose.Schema({
    _id : {
        type : String,
        required : false,
        default: function () { return shortId.generate();}
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
    },
    admin : {
        type: Boolean,
        required : false
    }
});

module.exports = mongoose.model('User', userSchema , 'geodecisions_users');