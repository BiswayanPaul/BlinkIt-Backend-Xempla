const express = require('express')


const deliveryManUpdate = express.Router();

deliveryManUpdate.put("/", (req, res) => {
    res.status(200).json({
        msg: "Hello from deliveryman Update"
    })
})

module.exports = {
    deliveryManUpdate
}
