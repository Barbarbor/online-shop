const express = require('express');
const likeRoutes = express.Router();
const Like = require('../models/Like'); // Import your models
const Product = require('../models/Product');
const CartItem = require("../models/CartItem");
// Route for creating a like
likeRoutes.post('/likes', async (req, res) => {
    try {
        const { UserId, ProductId } = req.body;

        // Check if the user has already liked the product
        const existingLike = await Like.findOne({
            where: { UserId:UserId,ProductId: ProductId },
        });

        if (existingLike) {
            return res.status(400).json({ error: 'User already liked this product' });
        }

        // Create a new like
        const newLike = await Like.create({
            UserId: UserId,
            ProductId: ProductId,
        });

        res.status(201).json({newLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create like' });
    }
});

// Route for getting liked products
likeRoutes.get('/likes', async (req, res) => {
    try {
        const { UserId } = req.query;

        // Fetch liked product IDs from your database
        const likedProducts = await Like.findAll({
            where: { UserId: UserId },
        });

        const likedProductIds = likedProducts.map((like) => like.ProductId);

        // Fetch product details for the liked products
        const productDetails = await Product.findAll({
            where: {
                id: likedProductIds,
            },
        });

        res.status(200).json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch liked products' });
    }
});
likeRoutes.delete('/likes/:userId/:productId', async (req, res) => {
    try {
        const {userId, productId } = req.params;

        // Find the cart item by its ID and delete it
        const like = await Like.findOne({where:{ProductId: productId, UserId: userId}});

        if (!like) {
            return res.status(404).json({ error: 'like not found' });
        }

        await like.destroy();

        return res.status(204).send(); // No content, successfully deleted
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete like' });
    }
});
module.exports = likeRoutes;
