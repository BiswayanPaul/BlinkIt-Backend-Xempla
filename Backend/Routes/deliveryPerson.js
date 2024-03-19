const express = require('express');

const DeliveryPerson = require('../Model/deliveryPerson');
const Order = require('../Model/order');

const router = express.Router();
// Route to accept delivery request
router.put('/accept/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { d_id } = req.body;

    // Update delivery person's status to not idle
    await DeliveryPerson.findByIdAndUpdate(d_id, { d_idle: false });

    // Update order status to in transit
    await Order.findByIdAndUpdate(orderId, { delivery_status: 'intransit' });

    res.json({ message: 'Delivery request accepted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to mark order as delivered
router.put('/deliver/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { d_id } = req.body;

    // Update delivery person's status to idle
    await DeliveryPerson.findByIdAndUpdate(d_id, { d_idle: true });

    // Update order status to delivered and set time of delivery
    const currentTime = new Date();
    await Order.findByIdAndUpdate(orderId, {
      delivery_status: 'delivered',
      time_of_delivery: currentTime
    });

    res.json({ message: 'Order delivered successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
