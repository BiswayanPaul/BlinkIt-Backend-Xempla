const express = require('express')

const deliveryManRead = express.Router();

deliveryManRead.get("/", (req, res) => {
    res.json({
        msg: "hello from read"
    })
})

module.exports = {
    deliveryManRead
}
