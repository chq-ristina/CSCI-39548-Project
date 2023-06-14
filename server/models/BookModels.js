const mongoose = require('mongoose')

const bookTemplate = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Array,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        required: false
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Favorites', bookTemplate)