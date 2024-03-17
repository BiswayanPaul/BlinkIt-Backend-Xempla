const express = require('express')

const customerRead = express.Router();

customerRead.get("/signup", (req, res) => {
    res.json({
        msg: "hello"
    })
})

module.exports = {
    customerRead
}
