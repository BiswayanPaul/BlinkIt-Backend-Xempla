const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = new mongoose.Schema({
    p_id: {
        type: String,
        required: true
    },
    r_id: {
        type: String,
        required: true
    },
    p_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensure price is not less than zero
    },
    amount: {
        type: Number,
        required: true,
        min: 0 // Ensure amount is not less than zero
    }
}, { versionKey: false });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
