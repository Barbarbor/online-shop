const Sequelize = require('sequelize');
const sequelize = require('./db_connection')
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Like = require('./models/Like');
sequelize.sync({ force: true })
    .then(() => {
        console.log('Таблица была успешно создана.');
    })
    .catch((error) => {
        console.error('Ошибка при создании таблицы:', error);
    });