 const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('db', 'postgres', '12345', {

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
