const express = require('express');
const router = express.Router();
const Product = require('../../Model/product');

// Update a product
router.patch('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (req.body.price != null) {
            product.price = req.body.price;
        }
        if (req.body.amount != null) {
            product.amount = req.body.amount;
        }
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
