const express = require("express");
const router = express.Router();
const Store = require("../../Model/store");

// Update a store
router.patch("/:id", async (req, res) => {
  //   console.log("In store update");
  //   console.log(`Req Body : ${req.body.product_list}`);
  try {
    const store = await Store.findOne({ r_id: req.params.id });
    //   console.log(req);
    if (store == null) {
      return res.status(404).json({ message: "Store not found" });
    }
    if (req.body.r_id != null) {
      store.r_id = req.body.r_id;
    }
    if (req.body.product_list != null) {
      const newProductList = [];
      for (const p of req.body.product_list) {
        // console.log(p);
        newProductList.push(p);
      }
      const currentProductList = [];
      for (const p of store.product_list) {
        currentProductList.push({
          p_id: p.p_id,
          amount: p.amount,
        });
      }
      //   console.log("CurrentPDL");
      //   console.log(currentProductList);
      //   console.log("New Pdl", newProductList);
      var updatedProductList = [];
      const listMap = new Map();
      for (const p of newProductList) {
        // console.log(p);
        listMap.set(p.p_id, p);
      }
      for (const p of currentProductList) {
        if (listMap.has(p.p_id)) {
          //   console.log("in if");
          //   console.log(listMap.get(p.p_id));
          const q = listMap.get(p.p_id);
          updatedProductList.push({
            p_id: q.p_id,
            amount: q.amount,
          });
        } else {
          //   console.log("in else");
          //   console.log(p);
          updatedProductList.push({
            p_id: p.p_id,
            amount: p.amount,
          });
        }
      }
      //   console.log(`Updated Final List : ${updatedProductList}`);
      store.product_list = updatedProductList;
    }
    // Update other fields similarly
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
