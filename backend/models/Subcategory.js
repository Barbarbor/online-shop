const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance

const Subcategory = sequelize.define('Subcategory', {

    name: DataTypes.STRING,
    // other fields can be added here
    CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false, // This ensures that CategoryId cannot be null
    },
});

// Define associations

module.exports = Subcategory;