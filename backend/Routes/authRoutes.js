const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import your User model
const authRoutes = express.Router();
const Sequelize = require('sequelize');
const secretKey = '001f-bbcd-3f4e-111a';
authRoutes.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the user's password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким именем или email уже существует' });
        }
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // You can also generate a JWT token and send it back to the client for authentication if needed
        // Implement JWT generation here

        res.json({  user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
authRoutes.post('/login', async(req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ where: {email:email } });

        // Проверка, существует ли пользователь с указанным именем
        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный пароль' });
        }
        const token = jwt.sign({ id: user.id, email: user.email, username:user.username }, secretKey, { expiresIn: '1h' });
        res.status(200).json({token:token,user:user});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
module.exports = authRoutes;