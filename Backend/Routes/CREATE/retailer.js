const express = require('express');
const router = express.Router();
const Retailer = require('../../Model/retailer');

// Create a new retailer
router.post('/', async (req, res) => {
    try {
        const newRetailer = new Retailer(req.body);
        await newRetailer.save();
        res.status(201).json(newRetailer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
