const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = '001f-bbcd-3f4e-111a';
const tokenVerificationRoute = express.Router();

// Пример маршрута, требующего аутентификации
tokenVerificationRoute.get('/verify', async (req, res) => {
    try {
        const token = req.header('Authorization');

        // Проверка, предоставлен ли токен
        if (!token) {
            return res.status(401).json({ message: 'Отсутствует токен авторизации' });
        }

        // Извлечение токена из строки 'Bearer <token>'


        // Проверка и верификация токена
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Неверный токен авторизации' });
            }

            // Если аутентификация прошла успешно, отправить успешный ответ
            res.status(200).json({ message: 'Верификация успешна', user });
        });
    } catch (error) {
        // Обработка других ошибок, если необходимо
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
module.exports = tokenVerificationRoute;