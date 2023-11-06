const express = require('express')
const orderRoutes = express.Router();
const Order = require('../models/Order');
orderRoutes.post('/orders', async (req, res) => {
    try {
        const { order_date, status, UserId,total } = req.body;

        // Create a new order
        const order = await Order.create({
            order_date:order_date,
            status:status,
            UserId: UserId,
            total:total,
        });

        return res.status(201).json(order);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add an order' });
    }
});
orderRoutes.get('/orders', async (req, res) => {
    try {
        // Find all orders
        const orders = await Order.findAll();

        return res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch orders' });
    }
});
module.exports = orderRoutes;