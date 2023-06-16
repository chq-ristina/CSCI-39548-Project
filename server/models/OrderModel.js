const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const orderTemplate = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    book_order: {
        type: Array,
        required: true
    },
    order_total:{
        type: Decimal128,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Orders', orderTemplate)