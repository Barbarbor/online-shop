const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db_connection'); // Import your Sequelize instance
const Like = sequelize.define('Like', {

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
    },
    UserId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ProductId: {
        type:DataTypes.INTEGER,
        allowNull: false
    }
    // other fields can be added here if needed
});

// Define associations

module.exports = Like;