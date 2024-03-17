const express = require('express');
const router = express.Router();
const Retailer = require('../../Model/retailer');

// Get all retailers
router.get('/', async (req, res) => {
    try {
        const retailers = await Retailer.find();
        res.json(retailers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
