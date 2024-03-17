const express = require('express')

const customerDelete = express.Router();

customerDelete.delete("/", (req, res) => {
    res.json({
        msg: "hello"
    })
})

module.exports = {
    customerDelete
}
