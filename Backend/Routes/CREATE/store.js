const express = require("express");
const router = express.Router();
const Store = require("../../Model/store");
const Retailer = require("../../Model/retailer");
const Product = require("../../Model/product");
// const { axios } = require("axios");
// Create a new store
router.post("/", async (req, res) => {
  try {
    const { r_id, product_list } = req.body;
    // console.log(req.body);
    console.log(`r_id : ${r_id}`);
    const r = await Retailer.findOne({ r_id: r_id });
    const sr = await Store.findOne({ r_id: r_id });
    // If the Retailer does not exists in the retialer db then he/she can't have a store in his/her name.
    if (!r) {
      console.log("Retailer Info : ", r);
      res.status(404).json({ message: "No Such Retailer" });
      return;
    }
    // Due to model level constraints one retailer can have only one store assigned to his/her name.
    if (sr) {
      console.log("Store info : ", sr);
      res.status(400).json({ message: "Store exists. Please use Update" });
      return;
    }
    // console.log(product_list);
    // Make Changes to the Product DB as well
    for (const p of product_list) {
      const num = p.p_id.substring(2, 3);
      const newProductData = {
        p_id: p.p_id,
        r_id: r_id,
        p_name: `Product ${num}`,
        price: p.price,
        amount: p.amount,
      };
      // console.log(newProductData);
      const newProduct = new Product(newProductData);
      await newProduct.save();
    }
    const newStore = new Store(req.body);
    await newStore.save();
    res.status(201).json({ message: "Store Added" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
