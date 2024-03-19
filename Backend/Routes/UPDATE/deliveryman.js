const express = require('express')
const DeliveryPerson = require('../../Model/deliveryPerson');
const Order = require('../../Model/order');

const deliveryManUpdate = express.Router();

deliveryManUpdate.put("/delivered/:orderID", (req, res) => {
    const orderId = req.params.orderID;
    const d_man_id = req.body.d_man_id;

    const d_man = DeliveryPerson.findOne({ d_id: d_man_id });
    const order = Order.findOne({
        o_id: orderId,
        payment_details:
        {
            status: "pending",
            mode: "cash"
        }
    });

    d_man.d_idle = true;

    order.payment_details.status = 'paid';

    order.delivery_status = "delivered";

    const savedDman = d_man.save();
    const savedOrder = order.save();

    res
        .status(200)
        .json({
            msg: "Order is delivered to customer successfully",
            d_id: savedDman.d_id,
            o_id: savedOrder.o_id
        })
})

module.exports = {
    deliveryManUpdate
}
