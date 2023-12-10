const express = require('express');
const bodyParser = require('body-parser');
const authenticateToken = require('../middleware/authenticateToken'); // Путь к вашему middleware
const User = require('../models/User');

const tokenVerificationRoute = express.Router();


// Пример маршрута, требующего аутентификации
tokenVerificationRoute.get('/verify', authenticateToken, async (req, res) => {
    try {
        // Используйте информацию о пользователе из объекта запроса
        const userId = req.user.userId;
        const user = await User.findByPk(userId);

        res.status(200).json({ message: 'Доступ к защищенному ресурсу', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
module.exports = tokenVerificationRoute;