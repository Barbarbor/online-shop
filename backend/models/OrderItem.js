const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance

const OrderItem = sequelize.define('OrderItem', {

    quantity: DataTypes.INTEGER,

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