const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance
const User = sequelize.define('User', {

    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,

});

module.exports = User;
