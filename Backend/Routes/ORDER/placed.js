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
  const R = 6371000; // Radius of the Earth in kilometers
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

function checkAvail(productList, order) {
  const productsMap = new Map();
  productList.forEach((product) => {
    // console.log(`Product : ${product}`);
    productsMap.set(product.p_id, true);
  });
  //   productList.forEach((product) => {
  //     console.log(
  //       ` CHK Product in map => ${product.p_id} : ${productsMap.get(
  //         product.p_id
  //       )} `
  //     );
  //   });

  //   order.forEach((orderItem) => {
  //     console.log(`Order Item => ${orderItem.p_id} : ${orderItem.amount}`);
  //   });
  for (const orderItem of order) {
    if (!productsMap.has(orderItem.p_id)) {
      console.log("false");
      return false; // Product not found in productList
    }
    const pdct = productList.find((product) => product.p_id === orderItem.p_id);
    // console.log(`Product in the store ${pdct.p_id} : ${pdct.amount}`);
    if (pdct.amount < orderItem.amount) {
      console.log("false in amount");
      return false;
    }
  }
  console.log("true");
  return true;
}

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(`{ c_id : ${id} }`);
  var size;
  var order_id;
  var retailer_id;
  // c_id,r_id,shipping_address,order_details,
  try {
    size = await Order.countDocuments({});
    order_id = idString + (size + 1);
    console.log(`{ o_id : ${order_id} }`);
  } catch (error) {
    res.status(500).send({ message: "DB Error" });
  }
  const latt = req.body.co_ordinates.latt;
  const long = req.body.co_ordinates.long;
  const orderedProductList = req.body.products;
  var distance = new Map();
  try {
    const stores = await Store.find({});
    for (const store of stores) {
      console.log(`Store : ${store.r_id}`);
      if (await checkAvail(store.product_list, orderedProductList)) {
        const store_loc = await Retailer.findOne(
          { r_id: store.r_id },
          { r_location: true }
        );
        // console.log(
        //   `retailer found : ${store.r_id} : loc : ${store_loc.r_location}`
        // );
        const store_cord = store_loc.r_location.coordinates;
        distance.set(
          store.r_id,
          await dist(store_cord[0], store_cord[1], latt, long)
        );
      }
    }
    const sortedDistanceArray = Array.from(distance).sort(
      (a, b) => a[1] - b[1]
    );
    const sortedDistanceMap = new Map(sortedDistanceArray);
    // console.log(sortedDistanceMap);
    const mapAsArray = Array.from(sortedDistanceMap);
    retailer_id = mapAsArray[0][0];
    const mapJSON = JSON.stringify(Object.fromEntries(mapAsArray));
    // console.log(`distance map : ${mapJSON}`);
    res.status(200).json({ distance_map: mapJSON });
  } catch (error) {
    res.status(500).send({ message: "Stores DB Error" });
  }
});

module.exports = router;
