const express = require('express')
const cartitemRoutes = express.Router();
const CartItem = require('../models/CartItem');

// Create a new cart item
cartitemRoutes.post('/cartitems', async (req, res) => {
    try {
        const { quantity, ProductId, UserId } = req.body;

        // Create a new cart item
        const cartItem = await CartItem.create({
            quantity:quantity,
            ProductId:ProductId,
            UserId:UserId,
        });

        return res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add cart item' });
    }
});
cartitemRoutes.get('/cartitems/:UserId', async (req, res) => {
    try {
        const UserId = req.params.UserId;

        // Find all cart items for the user
        const cartItems = await CartItem.findAll({ where: { UserId } });

        return res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch cart items' });
    }
});
module.exports = cartitemRoutes;