const mongoose = require("mongoose");
require("dotenv").config();

const customerSchema = new mongoose.Schema({
    c_name: {
        type: String,
        required: true
    },
    c_phone: {
        type: Number,
        required: true,
        unique: true
    },
    c_email: {
        type: String,
        required: false
    },
    c_loc: {
        type: [[Number]],
        required: true
    },
    c_rating: {
        type: Number,
        default: 5
    },
    c_password: {
        type: String,
        required: true
    }
});

// Create a Mongoose model for the customer
const Customer = mongoose.model('Customer', customerSchema);

// Export the Customer model
module.exports = Customer;