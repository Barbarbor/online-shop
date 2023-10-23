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
cartitemRoutes.get('/cartitems', async (req, res) => {
    try {


        // Find all cart items for the user
        const cartItems = await CartItem.findAll();

        return res.status(200).json(cartItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch cart items' });
    }
});
cartitemRoutes.delete('/cartitems/:cartitemId', async (req, res) => {
    try {
        const { cartitemId } = req.params;

        // Find the cart item by its ID and delete it
        const cartItem = await CartItem.findByPk(cartitemId);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        await cartItem.destroy();

        return res.status(204).send(); // No content, successfully deleted
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete cart item' });
    }
});
module.exports = cartitemRoutes;