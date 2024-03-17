const express = require("express");
const { customerCreate } = require("../CREATE/customer");
const { customerUpdate } = require("../UPDATE/customer");
const { customerDelete } = require("../DELETE/customer");
const { customerRead } = require("../READ/customer");

const customer = express.Router();

customer.use("/", customerCreate)
customer.use("/", customerUpdate)
customer.use("/", customerRead)
customer.use("/", customerDelete)

module.exports = {
    customer
}