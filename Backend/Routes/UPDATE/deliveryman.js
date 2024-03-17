const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DeliveryPerson = require('../../Model/deliveryPerson');


const deliveryPersonUpdate = express.Router();

deliveryPersonUpdate.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello from deliveryman Update"
    })
})


module.exports = {
    deliveryPersonUpdate
}
