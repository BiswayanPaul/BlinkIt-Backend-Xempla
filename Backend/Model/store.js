const mongoose = require("mongoose");
require("dotenv").config();

const storeSchema = new mongoose.Schema({
    r_id: {
        type: String,
        required: true
    },
    product_list: [{
        p_id: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    }]
}, { versionKey: false });

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
