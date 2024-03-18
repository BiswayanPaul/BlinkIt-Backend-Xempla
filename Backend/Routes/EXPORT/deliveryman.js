const express = require("express");
const { deliveryManRead } = require("../READ/deliveryman");
const { deliveryManUpdate } = require("../UPDATE/deliveryman");
const { deliveryManDelete } = require("../DELETE/deliveryman");
const { deliveryManCreate } = require("../CREATE/deliveryman");



const deliveryman = express.Router();

deliveryman.use("/", deliveryManRead)
deliveryman.use("/", deliveryManCreate)
deliveryman.use("/", deliveryManUpdate)
deliveryman.use("/", deliveryManDelete)

module.exports = {
    deliveryman
}