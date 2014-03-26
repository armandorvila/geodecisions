var mongoose = require('mongoose');

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
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    factors : [{ type: Schema.Types.ObjectId, ref: 'Factor' }],
    tags : [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
});

module.exports = mongoose.model('Process', processSchema, 'geodecisions_processes');