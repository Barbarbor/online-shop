const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance
const Like = sequelize.define('Like', {

    // other fields can be added here if needed
});

// Define associations

module.exports = Like;