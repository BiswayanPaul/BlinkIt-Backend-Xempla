const mongoose = require("mongoose");
require("dotenv").config();

const customerSchema = new mongoose.Schema({
    c_id: {
        type: String,
        required: true
    },
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
        type: [{
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }],
        required: true
    },
    c_rating: {
        type: Number,
        default: 5
    }
});

// Create a Mongoose model for the customer
const Customer = mongoose.model('Customer', customerSchema);

// Export the Customer model
module.exports = Customer;