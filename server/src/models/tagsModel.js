var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    _id : {
        type : String,
    },
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Tag', tagSchema, 'geodecisions_tags');