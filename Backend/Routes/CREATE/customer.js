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
        const token = jwt.sign({ _id: savedCustomer._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
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
customerCreate.post("/signin", async (req, res) => {

    try {
        const { c_phone, c_password } = req.body;

        const customer = await Customer.find({ c_phone: c_phone });

        if (!customer) {
            return res.status(401).json({
                msg: "Signin failed "
            })
        }

        // console.log(customer.c_name)

        // console.log(customer[0].c_password);
        // console.log(c_password)

        const match = await bcrypt.compare(c_password, customer[0].c_password);

        if (!match) {
            return res.status(401).json({
                msg: "Incorrect Password"
            })
        }

        const token = jwt.sign({ customerId: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            token,
            msg: "Logged In"
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: "Internal Server error"
        })
    }
})


module.exports = {
    customerCreate
}
