const express = require('express');
const router = express.Router();
const Retailer = require('../../Model/retailer');

// Delete a retailer
router.delete('/:id', async (req, res) => {
    try {
        const retailer = await Retailer.findById(req.params.id);
        if (retailer == null) {
            return res.status(404).json({ message: 'Retailer not found' });
        }
        await Retailer.deleteOne({ _id: req.params.id });
        res.json({ message: 'Retailer deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
