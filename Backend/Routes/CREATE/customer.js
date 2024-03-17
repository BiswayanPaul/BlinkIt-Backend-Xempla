const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Customer = require('../../Model/customer');


const customerCreate = express.Router();


customerCreate.post("/signup", async (req, res) => {
    const { c_phone, c_password, c_name, c_email, c_loc } = req.body;
    try {
        const existingUser = await Customer.findOne({ c_phone: c_phone })
        if (existingUser) {
            return res.status(400).json({
                msg: "Phone Number already registered"
            });
        }
        let password = c_password.toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newCustomer = new Customer({
            c_phone,
            c_password: hashedPassword,
            c_name,
            c_email,
            c_loc
        })
        const savedCustomer = await newCustomer.save();
        const token = jwt.sign({ _id: savedCustomer._id }, process.env.JWT_SECRET)
        return res.status(200).json({
            token,
            msg: "New customer is created"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Internal server error"
        })
    }

})
customerCreate.post("/signin", (req, res) => {
    const [phone, password] = req.body;

    const customer = Customer.findOne({ c_phone: phone });

    if(customer){
        
    }

})


module.exports = {
    customerCreate
}
