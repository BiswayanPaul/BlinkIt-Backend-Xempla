const express = require('express');
const router = express.Router();
const Retailer = require('../../Model/retailer');

// Update a retailer
router.patch('/:id', async (req, res) => {
    try {
        const retailer = await Retailer.findById(req.params.id);
        if (retailer == null) {
            return res.status(404).json({ message: 'Retailer not found' });
        }

        // Update fields if provided in request body
        if (req.body.r_id != null) {
            retailer.r_id = req.body.r_id;
        }
        if (req.body.r_name != null) {
            retailer.r_name = req.body.r_name;
        }
        if (req.body.r_phoneNo != null) {
            retailer.r_phoneNo = req.body.r_phoneNo;
        }
        if (req.body.r_email != null) {
            retailer.r_email = req.body.r_email;
        }
        if (req.body.r_location != null) {
            // Assuming r_location is an object with coordinates property
            retailer.r_location = {
                type: 'Point',
                coordinates: req.body.r_location.coordinates
            };
        }
        if (req.body.r_rating != null) {
            retailer.r_rating = req.body.r_rating;
        }

        // Save the updated retailer
        await retailer.save();
        
        // Send the updated retailer as response
        res.json(retailer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
