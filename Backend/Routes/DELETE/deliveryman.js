const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DeliveryPerson = require('../../Model/deliveryPerson');


const deliveryPersonDelete = express.Router();

deliveryPersonDelete.get("/", (req, res) => {
    res.status(200).json({
        msg: "Hello from deliveryman Delete"
    })
})


module.exports = {
    deliveryPersonDelete
}
