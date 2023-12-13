 const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('shop-database', 'alexxpain', '123derebez', {

    host: 'localhost',
    dialect: 'postgres'/* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
})
try {
    sequelize.authenticate()
    console.log('Соединение с БД было успешно установлено')
} catch (e) {
    console.log('Невозможно выполнить подключение к БД: ', e)
}
module.exports = sequelize;