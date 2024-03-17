const mongoose = require("mongoose");
require("dotenv").config();

const paymentDetailsSchema = new mongoose.Schema({
  // Have to modified after every req
  status: {
    type: String,
    enum: ["paid", "pending"],
    default: "pending",
    required: true,
  },
  mode: {
    type: String,
    enum: ["cash", "online"],
    default: "cash",
    required: true,
  },
  transaction_id: {
    type: String,
    default: null,
  },
});

const orderSchema = new mongoose.Schema({
  o_id: {
    // BackEnd Logic
    type: String,
    required: true,
  },
  c_id: {
    // From the Req Params
    type: String,
    required: true,
  },
  r_id: {
    // BackEnd Logic
    type: String,
    required: true,
  },
  d_id: {
    // BackEnd Logic
    type: String,
    required: true,
  },
  time_of_order: {
    // From the request header
    type: Date,
    required: true,
  },
  time_of_delivery: {
    // After DP has confirmed delivery Will Provide
    type: Date,
    default: null,
  },
  shipping_address: {
    // Customer Will Provide
    type: [Number],
    required: true,
  },
  order_details: [
    // Customer Will Provide in data
    {
      p_id: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  total_pay: {
    type: Number,
  },
  delivery_status: {
    type: String,
    enum: ["received", "delivered", "intransit"],
    required: true,
  },
  payment_details: {
    type: paymentDetailsSchema,
    required: true,
  },
});

// Create a Mongoose model for the customer
const Order = mongoose.model("Order", orderSchema);

// Export the Customer model
module.exports = Order;
