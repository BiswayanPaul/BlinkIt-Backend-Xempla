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


const app = express();
const PORT = 3000;

app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });



app.use("/api/v1/product/create", createProductRouter);
app.use("/api/v1/product/delete", deleteProductRouter);
app.use("/api/v1/product/read", readProductRouter);
app.use("/api/v1/product/update", updateProductRouter);

app.use("/api/v1/retailer/create", createRetailerRouter);
app.use("/api/v1/retailer/delete", deleteRetailerRouter);
app.use("/api/v1/retailer/read", readRetailerRouter);
app.use("/api/v1/retailer/update", updateRetailerRouter);

app.use("/api/v1/store/create", createStoreRouter);
app.use("/api/v1/store/delete", deleteStoreRouter);
app.use("/api/v1/store/read", readStoreRouter);
app.use("/api/v1/store/update", updateStoreRouter);


app.get("/", (req, res) => {
    res.json({
        msg: "Hi!"
    })
})

// Customer Route
app.use("/api/v1/customer", customer)
// DeliveryMan Route
app.use("api/v1/deliveryman", deliveryman)

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})