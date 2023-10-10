const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance
const CartItem = sequelize.define('CartItem', {

    quantity: DataTypes.INTEGER,
    // other fields can be added here if needed
    ProductId:{
        type:DataTypes.INTEGER,
        allowNull: false,
    },
    UserId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// Define associations

module.exports = CartItem