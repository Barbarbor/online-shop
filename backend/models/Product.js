const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance
const Product = sequelize.define('Product', {

    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    photography_url: DataTypes.STRING,
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false, // This ensures that CategoryId cannot be null
    },
    SubcategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
    // other fields like category_id, subcategory_id, created_at, and updated_at can be added here
});
// Define associations

module.exports = Product;