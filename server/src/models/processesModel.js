var mongoose = require('mongoose');
var shortId = require('shortid');

var Schema = mongoose.Schema;

var processSchema = new Schema({
    _id : {
        type : String,
        default: function () { return shortId.generate();}
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    location : {
        address : String,
        lat : Number,
        lng : Number
    },
    user : {
        type : String,
        ref : 'User'
    },
    factors : [{ type: String, ref: 'Factor' }],
    tags : [{ type: String, ref: 'Tag' }]
});

module.exports = mongoose.model('Process', processSchema, 'geodecisions_processes');