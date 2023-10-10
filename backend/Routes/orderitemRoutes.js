const express = require('express')
const orderitemRoutes = express.Router();
const OrderItem = require('../models/OrderItem');
orderitemRoutes.post('/order-items', async (req, res) => {
    try {
        const { quantity, subtotal,ProductId, OrderId } = req.body;

        // Create a new order item
        const orderItem = await OrderItem.create({
            quantity:quantity,
            subtotal:subtotal,
            ProductId:ProductId,
            OrderId: OrderId
        });

        return res.status(201).json(orderItem);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add an order item' });
    }
});
orderitemRoutes.get('/order-items', async (req, res) => {
    try {
        // Find all order items
        const orderItems = await OrderItem.findAll();

        return res.status(200).json(orderItems);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch order items' });
    }
});
module.exports = orderitemRoutes;