const Sequelize = require('sequelize');
const sequelize = require('./db_connection')
const User = require('./models/User');
const Association = require('./db-associations');
Association();
CartItem = require('./models/CartItem');
Category = require('./models/Category');
Like = require('./models/Like');
Order = require('./models/Order');
OrderItem = require('./models/OrderItem');
Product = require('./models/Product');
Subcategory = require('./models/Subcategory');
sequelize.sync({force:true}).then(result=>{
    console.log(result);
})
    .catch(err=> console.log(err));