const express = require("express");
const customer = require("./Model/customer")

const app = express();
const PORT = 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        msg: "Hi!"
    })
})


app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`)
})