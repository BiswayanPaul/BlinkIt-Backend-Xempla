const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DeliveryPerson = require('../../Model/deliveryPerson');


const deliveryPersonRead = express.Router();

deliveryPersonRead.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello from deliveryman read"
    })
})


module.exports = {
    deliveryPersonRead
}
