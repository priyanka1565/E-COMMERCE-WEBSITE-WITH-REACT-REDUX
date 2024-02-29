const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const multer = require('multer');


// Set up Multer for handling file uploads
const storage = multer.memoryStorage();  // Store the file in memory as a Buffer
const upload = multer({ storage: storage });

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
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        const image = req.file;

        // Check if required fields are present
        if (!name || !description || !category || !price || !image) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            category,
            price,
            image: {
                data: image.buffer,
                contentType: image.mimetype,
                fileName: image.originalname
            }
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    try {
        const { name, description, price, category } = req.body;
        const image = req.file;

        // Check if required fields are present
        if (!name || !description || !price || !image || !category) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Create a new product
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageName: image.originalname,  // Save the image file name
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

})




module.exports = router;