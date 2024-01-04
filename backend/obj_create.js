const Sequelize = require('sequelize');
const sequelize = require('./db_connection')
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const Like = require('./models/Like');
for (let i=0;i<10;i++)
    Product.create({
    name:'aa',
    description:'aa',
    price:10,
    CategoryId:1,
    SubcategoryId:2,
    photography_url:"adsada",
})