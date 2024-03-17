const express = require('express')

const customerCreate = express.Router();

customerCreate.post("/signup", (req, res) => {
    res.json({
        msg: "hello"
    })
})

module.exports = {
    customerCreate
}
