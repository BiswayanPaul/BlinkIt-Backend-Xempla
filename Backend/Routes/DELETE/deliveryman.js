const express = require('express')

const deliveryManDelete = express.Router();

deliveryManDelete.delete("/", (req, res) => {
    res.status(200).json({
        msg: "Hello from deliveryman Delete"
    })
})

module.exports = {
    deliveryManDelete
}
