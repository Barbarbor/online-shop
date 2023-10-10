const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance

const Category = sequelize.define('Category', {

    name: DataTypes.STRING,
    // other fields can be added here
});

// Define associations

module.exports = Category;
