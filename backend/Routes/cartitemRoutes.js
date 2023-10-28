const express = require('express')
const cartitemRoutes = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
// Create a new cart item
cartitemRoutes.post('/cartitems', async (req, res) => {
    try {
        const { quantity, ProductId, UserId } = req.body;
        const isCartItemExists = await CartItem.findOne({where:{UserId:UserId,ProductId:ProductId}});
        if(isCartItemExists)
            return res.status(409).json({error:"This products already exists in cart"});
        else {
            // Create a new cart item
            const cartItem = await CartItem.create({
                quantity: quantity,
                ProductId: ProductId,
                UserId: UserId,
            });

            return res.status(201).json(cartItem);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add cart item' });
    }
        });
cartitemRoutes.get('/cartitems', async (req, res) => {
    try {


        // Find all cart items for the user
        const cartItems = await CartItem.findAll();
        const productIds = cartItems.map( (cartitem) => cartitem.ProductId );
        const products = await Product.findAll({where:{id:productIds}});
        const response = {cartitems:cartItems,products: products};
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch cart items' });
    }
});
cartitemRoutes.delete('/cartitems/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        // Find the cart item by its ID and delete it
        const cartItem = await CartItem.findOne({where:{ProductId:productId}});

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