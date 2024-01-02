const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection');
const Product = sequelize.define('Product', {

    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    photography_url: DataTypes.STRING,
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    SubcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});


module.exports = Product;

