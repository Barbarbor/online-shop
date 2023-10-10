const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance

const Order = sequelize.define('Order', {

    order_date: DataTypes.DATE,
    status: DataTypes.STRING,
    UserId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // other fields like user_id can be added here
});

// Define associations

module.exports = Order;