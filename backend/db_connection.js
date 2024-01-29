 const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('shop-database', 'postgres', '12345678', {

    host: 'localhost',
    dialect: 'postgres'
})
try {
    sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}
module.exports = sequelize;
