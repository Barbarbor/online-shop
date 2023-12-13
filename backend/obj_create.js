const Sequelize = require('sequelize');
const sequelize = require('./db_connection')
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Like = require('./models/Like');
Product.sync({ force: true })
    .then(() => {
        console.log('Таблица была успешно пересоздана.');
    })
    .catch((error) => {
        console.error('Ошибка при пересоздании таблицы:', error);
    });