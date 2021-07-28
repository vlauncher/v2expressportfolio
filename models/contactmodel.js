const mongoose = require('mongoose');

const contactModelSchema = mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String
    },
    subject : {
        type : String,
    },
    message : {
        type : String,
    },
})

const contactModel = module.exports =new mongoose.model('contactModel',contactModelSchema)