const express = require("express");
const Customer = require("./Model/customer");
const { mongoose } = require("mongoose");
const DeliveryPerson = require("./Model/deliveryPerson");
const { customer } = require("./Routes/EXPORT/customer");

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