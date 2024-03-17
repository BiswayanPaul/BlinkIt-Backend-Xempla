const express = require("express");
const router = express.Router();
const Order = require("../../Model/order");
const addLatLng = require("../../Middlewares/FindLocation");
const idString = "bl_@ord";

router.post("/:id", addLatLng, async (req, res) => {
  const id = req.params.id;
  console.log(`{id : ${id} }`);
  var size;
  var order_id;
  try {
    size = await Order.countDocuments({});
    order_id = idString + (size + 1);
  } catch (error) {
    res.status(500).send({ message: "DB Error" });
  }

  // o_id is finalised
  // c_id is finalised
  // time_of_order is also finalised
  console.log(req.latLng);
  const orderedProductList = req.body.products;
  console.log(orderedProductList);
  res.status(200).send(req.latLng);
});

module.exports = router;
