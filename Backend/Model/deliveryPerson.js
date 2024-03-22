const mongoose = require("mongoose");
require("dotenv").config();

const deliveryPersonSchema = new mongoose.Schema({
  d_id: {
    type: String,
    required: false,
  },
  d_name: {
    type: String,
    required: true,
  },
  d_phone: {
    type: Number,
    required: true,
    unique: true,
  },
  d_email: {
    type: String,
    required: false,
  },
  d_init_loc: {
    type: [[Number]],
    required: true,
  },
  d_curr_loc: {
    type: [[Number]],
    required: true,
  },
  d_rating: {
    type: Number,
    default: 5,
  },
  d_password: {
    type: String,
    required: true,
  },
  d_idle: {
    type: Boolean,
    // required: true,
    default: true,
  },
});

// Create a Mongoose model for the customer
const DeliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);

// Export the Customer model
module.exports = DeliveryPerson;
