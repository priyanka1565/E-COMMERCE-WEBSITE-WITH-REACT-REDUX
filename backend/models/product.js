const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        category:
        {
            type: String,
            required: true
        },

        price:
        {
            type: Number,
            required: true
        },
        image: {
            data: Buffer,  // Binary image data
            contentType: String,  // Image MIME type (e.g., 'image/jpeg', 'image/png')
            fileName: String  // Original file name of the image
        },
    });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
