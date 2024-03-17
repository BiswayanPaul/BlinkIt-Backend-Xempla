const express = require('express');
const router = express.Router();
const Store = require('../../Model/store');

// Create a new store
router.post('/', async (req, res) => {
    try {
        const newStore = new Store(req.body);
        await newStore.save();
        res.status(201).json(newStore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
