const express = require("express");
const connection = require("./config/db")
const app = express();

require("dotenv").config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.send({ "msg": "welcome to kryzen" })
})



app.listen(process.env.PORT, async () => {
    try {
        await connection()
        console.log({ msg: "connected to DB" })
    } catch (error) {

    }
    console.log({ msg: `server is running on port ${process.env.PORT}` })
})