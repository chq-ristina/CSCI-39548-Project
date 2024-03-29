const mongoose = require('mongoose');

const userTemplate = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const collection = mongoose.model("Users", userTemplate)

module.exports=collection