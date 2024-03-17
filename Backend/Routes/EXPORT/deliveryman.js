const express = require("express");
const { deliveryPersonCreate } = require("../CREATE/deliveryPerson");
const { deliveryPersonRead } = require("../READ/deliveryman");
const { deliveryPersonUpdate } = require("../UPDATE/deliveryman");

const deliveryman = express.Router();

deliveryman.use("/", deliveryPersonCreate)
deliveryman.use("/", deliveryPersonRead)
deliveryman.use("/", deliveryPersonUpdate)
deliveryman.use("/", deliveryPersonUpdate)

module.exports = {
    deliveryman
}