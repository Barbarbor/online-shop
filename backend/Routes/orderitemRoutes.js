const express = require('express')
const orderitemRoutes = express.Router();
const OrderItem = require('../models/OrderItem');
const Like = require("../models/Like")
const Product = require('../models/Product');
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
orderitemRoutes.get('/order-items/:orderId', async (req, res) => {
    try {

        const {orderId} = req.params;

        // Find all order items
        const orderItems = await OrderItem.findAll({where:{OrderId:orderId}});
        const productIds = orderItems.map( (order) => order.ProductId );
        const products = await Product.findAll({where:{id:productIds}});

        return res.status(200).json({orderItems:orderItems,products:products});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch order items'});
    }
});

orderitemRoutes.delete('/order-items/:orderItemId', async (req, res) => {
    try {
        const { orderItemId } = req.params;

        // Find the cart item by its ID and delete it
        const orderItem = await OrderItem.findByPk(orderItemId);

        if (!orderItem) {
            return res.status(404).json({ error: 'OrderItem not found' });
        }

        await orderItem.destroy();

        return res.status(204).send(); // No content, successfully deleted
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete OrderItem' });
    }
});
module.exports = orderitemRoutes;



const orderData = {status:"PAID",UserId:1,total:100,order_date:1};
const orderItemsData = [{quantity:1,ProductId:1,OrderId:1},{quantity:2,ProductId:2,OrderId:1}];