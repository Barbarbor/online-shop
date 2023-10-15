const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const loginRoutes = express.Router();

loginRoutes.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate and send a JWT token
            const token = jwt.sign({ userId: user.id }, 'zXjjnnao1e9pp-2249448,Mjdjv94ghXZXngeoP', {
                expiresIn: '1h', // Adjust the expiration time as needed
            });

            res.json({ message: 'Authentication successful', token });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = loginRoutes;