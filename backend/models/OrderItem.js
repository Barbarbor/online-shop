const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance

const OrderItem = sequelize.define('OrderItem', {

    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.FLOAT,
    // other fields like order_id and product_id can be added here
    OrderId:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    ProductId: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
});

// Define associations

module.exports = OrderItem;