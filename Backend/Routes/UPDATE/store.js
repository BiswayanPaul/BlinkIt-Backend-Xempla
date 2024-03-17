const express = require('express');
const router = express.Router();
const Store = require('../../Model/store');

// Update a store
router.patch('/:id', async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (store == null) {
            return res.status(404).json({ message: 'Store not found' });
        }
        if (req.body.r_id != null) {
            store.r_id = req.body.r_id;
        }
        if (req.body.product_list != null) {
            store.product_list = req.body.product_list;
        }
        // Update other fields similarly
        await store.save();
        res.json(store);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
