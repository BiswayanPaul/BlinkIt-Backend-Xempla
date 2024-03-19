const express = require('express')
const DeliveryPerson = require('../../Model/deliveryPerson');
const Order = require('../../Model/order');

const deliveryManUpdate = express.Router();

deliveryManUpdate.put("/delivered/:orderID", (req, res) => {
    const orderId = req.params.orderID;
    const d_man_id = req.body.d_man_id;

    try {
        const d_man = DeliveryPerson.findOne({ d_id: d_man_id });
        const order = Order.findOne({
            o_id: orderId,
            payment_details:
            {
                status: "pending",
                mode: "cash"
            }
        });

        const currentTime = new Date();

        d_man.d_idle = req.body.d_idle; // Boolean

        order.payment_details.status = req.body.payment_status;
        order.time_of_delivery = currentTime;
        order.delivery_status = req.body.delivery_status;

        const savedDman = d_man.save();
        const savedOrder = order.save();

        res
            .status(200)
            .json({
                msg: "Order is delivered to customer successfully",
                d_id: savedDman.d_id,
                o_id: savedOrder.o_id
            })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
})

module.exports = {
    deliveryManUpdate
}
