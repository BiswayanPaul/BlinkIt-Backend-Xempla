const express = require("express");
const router = express.Router();
const Order = require("../../Model/order");
const Store = require("../../Model/store");
const Retailer = require("../../Model/retailer");
const Product = require("../../Model/product");
// const Order = require("../../Model/order");
const DeliveryPerson = require("../../Model/deliveryPerson");
const { default: axios } = require("axios");
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
  var deliveryPerson_id;
  var total_pay = 0;
  const time_of_order = new Date();
  var payment_mode = req.body.payment_mode;
  var transaction_id = null;
  if (payment_mode == "online") transaction_id = req.body.transaction_id;
  var payment_status = req.body.payment_status;
  var destination_address;
  const payment_details = {
    status: payment_status,
    mode: payment_mode,
    transaction_id: transaction_id,
  };
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
  destination_address = [latt, long];
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
    const dlvpMap = new Map();
    try {
      console.log(`slected retailer : ${retailer_id}`);
      const deliveryPersons = await DeliveryPerson.find({});
      const retailStoreLoc = await Retailer.findOne(
        { r_id: retailer_id },
        { r_location: true }
      );

      //   console.log(retailStoreLoc);
      const retailStoreCord = retailStoreLoc.r_location.coordinates;
      //   console.log(retailStoreCord);
      for (const dlvp of deliveryPersons) {
        // console.log(dlvp.d_name);
        // console.log(dlvp.d_id);
        // console.log(dlvp.d_curr_loc[0][0]);
        // console.log(dlvp.d_curr_loc[0][1]);
        // console.log(retailStoreCord[0]);
        // console.log(retailStoreCord[1]);
        if (dlvp.d_idle) {
          dlvpMap.set(
            dlvp.d_id,
            await dist(
              retailStoreCord[0],
              retailStoreCord[1],
              dlvp.d_curr_loc[0][0],
              dlvp.d_curr_loc[0][1]
            )
          );
        }
      }
      //   console.log(dlvpMap);
      const sortedDlvpArray = Array.from(dlvpMap).sort((a, b) => a[1] - b[1]);
      const dlvpMapAsArray = Array.from(sortedDlvpArray);
      deliveryPerson_id = dlvpMapAsArray[0][0];
      var updated_data = [];
      console.log(`Selected Delivery Person ${deliveryPerson_id}`);
      try {
        const allProducts = await Product.find({});
        // console.log(allProducts);
        for (const orderItem of orderedProductList) {
          for (const pdct of allProducts) {
            if (pdct.p_id === orderItem.p_id && pdct.r_id === retailer_id) {
              console.log(pdct);
              total_pay = total_pay + orderItem.amount * pdct.price;
              const newAmount = pdct.amount - orderItem.amount;
              console.log(total_pay);
              await Product.findOneAndUpdate(
                { p_id: pdct.p_id, r_id: retailer_id },
                { amount: newAmount }
              );
              const newData = await Product.findOne(
                { p_id: pdct.p_id, r_id: retailer_id },
                { p_id: true, _id: false, amount: true }
              );
              updated_data.push(newData);
            }
          }
        }
        console.log(updated_data);
        // console.log(updated_data);
        const orderSlip = {
          o_id: order_id,
          c_id: id,
          r_id: retailer_id,
          d_id: deliveryPerson_id,
          time_of_order: time_of_order,
          shipping_address: destination_address,
          order_details: orderedProductList,
          total_pay: total_pay,
          delivery_status: "received",
          payment_details: payment_details,
        };

        const data = axios.patch(
          `http://localhost:${port}/api/v1/update/store/${retailer_id}`,
          updated_data
        );
        const newOrder = new Order(orderSlip);
        const savedOrder = newOrder.save();
        console.log(`Saved order : \n${orderSlip}`);
        res
          .status(200)
          .json({ message: "Order Placed", full_order_details: savedOrder });
      } catch (error) {
        res.status(500).json({ message: "Product DB error" });
      }
    } catch (error) {
      res.status(500).json({ mesasge: "DP DB error" });
    }
  } catch (error) {
    res.status(500).json({ message: "Stores DB Error" });
  }
});

module.exports = router;
