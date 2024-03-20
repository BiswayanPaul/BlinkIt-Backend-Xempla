const express = require("express");
const router = express.Router();
const Product = require("../../Model/product");
const Retailer = require("../../Model/retailer");
const Store = require("../../Model/store");
const axios = require("axios");
// Create a new product
router.post("/", async (req, res) => {
  try {
    const { r_id, p_id, price, amount } = req.body;
    const r = await Retailer.findOne({ r_id: r_id });
    const sr = await Store.findOne({ r_id: r_id });
    if (!r) {
      res.status(500).json({ message: "Not A valid Retailer" });
      return;
    }
    if (!sr) {
      const product_list = [];
      console.log(`price : ${price}`);
      product_list.push({ p_id: p_id, amount: amount, price: price });
      const store_data = {
        r_id: r_id,
        product_list: product_list,
      };
      //   console.log(store_data);
      const data = await axios.post(
        `http://localhost:${process.env.PORT}/api/v1/create/store/`,
        store_data
      );
      //   console.log(data);
    } else {
      const product_list = await Store.findOne(
        { r_id: r_id },
        { product_list: true, _id: false }
      );
      const product_list_array = [product_list];
      //   console.log(`Is Array : ${Array.isArray(product_list)}`);
      //   console.log(`If Store exixts : ${product_list_array}`);
      const new_list = [];
      new_list.push({ p_id: p_id, amount: amount, price: price });
      for (const p of product_list_array) {
        new_list.push({ p_id: p.p_id, amount: p.new_amount, price: p.price });
      }
      await Store.findOneAndUpdate({ r_id: r_id }, { product_list: new_list });
      const newProduct = new Product(req.body);
      await newProduct.save();
      res.status(201).json(newProduct);
      return;
    }
    res.status(201).json({ message: "Product Added" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
