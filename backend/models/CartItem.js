const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection');
const CartItem = sequelize.define('CartItem', {

    quantity: DataTypes.INTEGER,

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