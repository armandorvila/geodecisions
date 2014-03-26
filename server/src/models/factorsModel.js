var mongoose = require('mongoose');
var shortId = require('shortid');

var factorSchema = mongoose.Schema({
    _id : {
        type : String,
        required : false,
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
    
    layers : [{
        type : String
    }],
    
    scope : {
        type : String
    }
});


module.exports = mongoose.model('Factor', factorSchema, 'geodecisions_factors');