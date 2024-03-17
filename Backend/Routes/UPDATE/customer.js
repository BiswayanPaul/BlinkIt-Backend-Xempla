const express = require('express')

const customerUpdate = express.Router();

customerUpdate.put("/signup", (req, res) => {
    res.json({
        msg: "hello"
    })
})

module.exports = {
    customerUpdate
}
