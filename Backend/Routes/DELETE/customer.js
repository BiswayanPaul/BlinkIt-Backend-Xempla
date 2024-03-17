const express = require('express')

const customerDelete = express.Router();

customerDelete.get("/signup", (req, res) => {
    res.json({
        msg: "hello"
    })
})

module.exports = {
    customerDelete
}
