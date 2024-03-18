const express = require("express");
const router = express.Router();
const Order = require("../../Model/order");
const Store = require("../../Model/store");
const Retailer = require("../../Model/retailer");
const addLatLng = require("../../Middlewares/FindLocation");
const idString = "bl_@ord";

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function dist(lat1, lng1, lat2, lng2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLng = deg2rad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

router.post("/:id", async (req, res) => {
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
  const latt = req.body.co_ordinates.latt;
  const long = req.body.co_ordinates.long;
  var distance = [{}];

  var retailer;
  try {
    const stores = await Store.find({});

    stores.forEach((store) => {
      console.log(store.r_id);
    });
  } catch (error) {
    res.status(500).send({ message: "Stores DB Error" });
  }

  console.log(order_id);
  const orderedProductList = req.body.products;
  res.status(200).send(req.co_ordinates);
});

module.exports = router;
