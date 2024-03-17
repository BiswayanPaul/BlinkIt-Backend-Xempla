const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const DeliveryPerson = require('../../Model/deliveryPerson');


const deliveryPersonCreate = express.Router();


deliveryPersonCreate.post("/signup", async (req, res) => {
    const { d_phone, d_password, d_name, d_email, d_init_loc, d_curr_loc } = req.body;
    try {
        const existingUser = await DeliveryPerson.findOne({ d_phone: d_phone })
        if (existingUser) {
            return res.status(400).json({
                msg: "Phone Number already registered"
            });
        }
        let password = d_password.toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newdeliveryPerson = new DeliveryPerson({
            d_phone,
            d_password: hashedPassword,
            d_name,
            d_email,
            d_init_loc,
            d_curr_loc
        })
        const savedDeliveryPerson = await newdeliveryPerson.save();
        const token = jwt.sign({ _id: savedDeliveryPerson._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(200).json({
            token,
            msg: "New deliveryPerson is created"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Internal server error"
        })
    }

})
deliveryPersonCreate.post("/signin", async (req, res) => {

    try {
        const { d_phone, d_password } = req.body;

        const deliveryPerson = await DeliveryPerson.find({ d_phone: d_phone });

        if (!deliveryPerson) {
            return res.status(401).json({
                msg: "Signin failed "
            })
        }

        // console.log(deliveryPerson.d_name)

        // console.log(deliveryPerson[0].d_password);
        // console.log(d_password)

        const match = await bcrypt.compare(d_password, deliveryPerson[0].d_password);

        if (!match) {
            return res.status(401).json({
                msg: "Incorrect Password"
            })
        }

        const token = jwt.sign({ deliveryPersonId: deliveryPerson._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
    deliveryPersonCreate
}
