const express = require("express");
const Customer = require("./Model/customer");
const { mongoose } = require("mongoose");
const DeliveryPerson = require("./Model/deliveryPerson");
const { customer } = require("./Routes/EXPORT/customer");

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



app.get("/", (req, res) => {
    res.json({
        msg: "Hi!"
    })
})

// Customer Route
app.use("/api/v1/customer", customer)


app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})