const mongoose = require("mongoose");
require("dotenv").config();

const retailerSchema = new mongoose.Schema({
    r_id: {
        type: String,
        required: true
    },
    r_name: {
        type: String,
        required: true
    },
    r_phoneNo: {
        type: Number,
        required: true,
        unique: true
    },
    r_email: {
        type: String,
        required: false
    },
    r_location: {
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
    r_rating: {
        type: Number,
        default: 5
    }
}, { versionKey: false });

const Retailer = mongoose.model('Retailer', retailerSchema);

module.exports = Retailer;
