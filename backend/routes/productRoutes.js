const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//create a new product
router.post('/', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const saveProduct = await newProduct.save();
        res.status(201).json(saveProduct);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
})




module.exports = router;