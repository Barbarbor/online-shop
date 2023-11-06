const express = require('express')
const orderitemRoutes = express.Router();
const OrderItem = require('../models/OrderItem');
const Like = require("../models/Like");
orderitemRoutes.post('/order-items', async (req, res) => {
    try {
        const { quantity,ProductId, OrderId } = req.body;
        

        const orderItems = req.body;

        // Create a new order item
        const createdOrderItems  = await OrderItem.bulkCreate(orderItems);

        return res.status(201).json(createdOrderItems);

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
orderitemRoutes.delete('/order-items/orderitemId', async (req, res) => {
    try {
        const { orderitemId } = req.params;

        // Find the cart item by its ID and delete it
        const orderitem = await OrderItem.findByPk(orderitemId);

        if (!orderitem) {
            return res.status(404).json({ error: 'Orderitem not found' });
        }

        await orderitem.destroy();

        return res.status(204).send(); // No content, successfully deleted
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete Orderitem' });
    }
});
module.exports = orderitemRoutes;



const orderData = {status:"PAID",UserId:1,total:100,order_date:1};
const orderItemsData = [{quantity:1,ProductId:1,OrderId:1},{quantity:2,ProductId:2,OrderId:1}];