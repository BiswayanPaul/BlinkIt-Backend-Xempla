const express = require("express");
const Customer = require("./Model/customer");
const { mongoose } = require("mongoose");
const DeliveryPerson = require("./Model/deliveryPerson");
const { customer } = require("./Routes/EXPORT/customer");
const { deliveryman } = require("./Routes/EXPORT/deliveryman");

// Importing routes for CRUD operations

const createProductRouter = require("./Routes/CREATE/product");
const deleteProductRouter = require("./Routes/DELETE/product");
const readProductRouter = require("./Routes/READ/product");
const updateProductRouter = require("./Routes/UPDATE/product");

const createRetailerRouter = require("./Routes/CREATE/retailer");
const deleteRetailerRouter = require("./Routes/DELETE/retailer");
const readRetailerRouter = require("./Routes/READ/retailer");
const updateRetailerRouter = require("./Routes/UPDATE/retailer");

const createStoreRouter = require("./Routes/CREATE/store");
const deleteStoreRouter = require("./Routes/DELETE/store");
const readStoreRouter = require("./Routes/READ/store");
const updateStoreRouter = require("./Routes/UPDATE/store");
const orderconfirmRouter = require("./Routes/deliveryPerson");
const orderPlacementRouter = require("./Routes/ORDER/placed");
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/v1/create/product", createProductRouter);
app.use("/api/v1/delete/product", deleteProductRouter);
app.use("/api/v1/read/product", readProductRouter);
app.use("/api/v1/update/product", updateProductRouter);

app.use("/api/v1/create/retailer", createRetailerRouter);
app.use("/api/v1/delete/retailer", deleteRetailerRouter);
app.use("/api/v1/read/retailer", readRetailerRouter);
app.use("/api/v1/update/retailer", updateRetailerRouter);

app.use("/api/v1/create/store", createStoreRouter);
app.use("/api/v1/delete/store", deleteStoreRouter);
app.use("/api/v1/read/store", readStoreRouter);
app.use("/api/v1/update/store", updateStoreRouter);

app.use("/api/v1/order/placed/", orderPlacementRouter);
app.use("/api/v1/order/", orderconfirmRouter);
app.get("/", (req, res) => {
  res.json({
    msg: "Hi!",
  });
});

// Customer Route


app.use("/api/v1/customer", customer);
app.use("/api/v1/deliveryman", deliveryman);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
