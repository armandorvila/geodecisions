var mongoose = require('mongoose');
var shortId = require('shortid');

var tagSchema = mongoose.Schema({
    _id : {
        type : String,
        default: function () { return shortId.generate();}
    },
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Tag', tagSchema, 'geodecisions_tags');