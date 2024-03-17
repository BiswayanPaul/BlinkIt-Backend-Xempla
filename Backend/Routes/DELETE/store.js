const express = require("express");
const router = express.Router();
const Store = require("../../Model/store");

// Delete a store
router.delete("/:id", async (req, res) => {
  try {
    var store;
    try {
      store = await Store.findById(req.params.id);
    } catch (error) {
      if (store == null) {
        return res.status(404).json({ message: "Store not found" });
      }
    }
    await Store.deleteOne({ _id: req.params.id });
    res.json({ message: "Store deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
