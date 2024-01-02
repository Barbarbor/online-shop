const { Sequelize } = require('sequelize');
const sequelize = require('./db_connection');
CartItem = require('./models/CartItem');
Category = require('./models/Category');
Like = require('./models/Like');
Order = require('./models/Order');
OrderItem = require('./models/OrderItem');
Product = require('./models/Product');
Subcategory = require('./models/Subcategory');
User = require('./models/User');
const Associate = () => {
    User.belongsToMany(Product, {through: Like});
    User.belongsToMany(Product, {through: Like, foreignKey: 'UserId'});
    User.hasMany(CartItem);
    User.hasMany(Order);

    Product.belongsTo(Category, {foreignKey: 'CategoryId'});
    Product.belongsTo(Subcategory, {foreignKey: 'CategoryId'});
    Product.belongsToMany(User, {through: Like});
    Product.belongsToMany(User, {through: Like, foreignKey: 'ProductId'});
    Product.hasMany(CartItem);
    Product.hasMany(OrderItem);

    Subcategory.belongsTo(sequelize.models.Category, { foreignKey: 'CategoryId' });

    CartItem.belongsTo(User, {foreignKey:'UserId'});
    CartItem.belongsTo(Product, {foreignKey: 'ProductId'});

    Order.belongsTo(User, {foreignKey:'UserId'});
    Order.hasMany(OrderItem);

    OrderItem.belongsTo(Order,{foreignKey: 'OrderId'});
    OrderItem.belongsTo(Product,{foreignKey: 'ProductId'});
    return( console.log("success!")
    )
};
module.exports = Associate;