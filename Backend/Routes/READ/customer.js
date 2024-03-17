const express = require('express')

const customerRead = express.Router();

customerRead.get("/", (req, res) => {
    res.json({
        msg: "hello from read"
    })
})

module.exports = {
    customerRead
}
