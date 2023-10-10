const express = require('express')
const productRoutes = express.Router();
const Product  = require('../models/Product'); // Import your Product model




// Create a new product with photo path
productRoutes.post('/products', async (req, res) => {
    try {
        const { name, description, price, CategoryId, SubcategoryId, photography_url } = req.body;

        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            photography_url: photography_url, // Save the photo path
            CategoryId: CategoryId,
            SubcategoryId: SubcategoryId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Unable to create product' });
    }
});

// Get a list of products
productRoutes.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Unable to fetch products' });
    }
});

module.exports = productRoutes;
productRoutes.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        // Fetch the product details by its ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch product details' });
    }
});

module.exports = productRoutes;