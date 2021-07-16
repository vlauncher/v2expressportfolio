const mongoose = require('mongoose');

const contactModelSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String
    },
    subject : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    }
})

const contactModel = module.exports = mongoose.model('contactModel',contactModelSchema)