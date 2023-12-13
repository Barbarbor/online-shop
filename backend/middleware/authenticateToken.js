const jwt = require('jsonwebtoken');
const  User  = require('../models/User');
const secretKey = '001f-bbcd-3f4e-111a';

const authenticateToken = (req, res, next) => {
    const token = req.body;

    // Проверка, предоставлен ли токен
    if (!token) {
        return res.status(401).json({ message: 'Отсутствует токен авторизации' });
    }

    // Проверка и верификация токена
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Неверный токен авторизации' });
        }

        req.user = user; // Добавление информации о пользователе в объект запроса
        next();
    });
};

module.exports = authenticateToken;
