var mongoose = require('mongoose');

var factorSchema = mongoose.Schema({
    _id : {
        type : String,
    },
    name : {
        type : String,
        required : true
    },
    
    description : {
        type : String,
        required : true
    },
    
    layer : {
        type : String
    },
    
    scope : {
        type : String
    }
});

module.exports = mongoose.model('Factor', factorSchema, 'geodecisions_factors');