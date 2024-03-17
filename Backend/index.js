const express = require("express");
const Customer = require("./Model/customer");
const { mongoose } = require("mongoose");
const DeliveryPerson = require("./Model/deliveryPerson");

const app = express();
const PORT = 3000;

app.use(express.json());

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


app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})