const express = require('express');
const router = express.Router();
const Product = require('../../Model/product');

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        await Product.deleteOne({ _id: req.params.id }); // Using deleteOne() method
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
