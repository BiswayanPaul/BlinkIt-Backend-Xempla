const mongoose = require("mongoose");
require("dotenv").config();

const deliveryPersonSchema = new mongoose.Schema({
    d_id: {
        type: String,
        required: true
    },
    d_name: {
        type: String,
        required: true
    },
    d_phone: {
        type: Number,
        required: true,
        unique: true
    },
    d_email: {
        type: String,
        required: false
    },
    d_init_loc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    d_curr_loc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    d_rating: {
        type: Number,
        default: 5
    }
});

// Create a Mongoose model for the customer
const DeliveryPerson = mongoose.model('DeliveryPerson', deliveryPersonSchema);

// Export the Customer model
module.exports = DeliveryPerson;