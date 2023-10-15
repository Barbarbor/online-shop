const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model
const registrationRoutes = express.Router();

registrationRoutes.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Hash the user's password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // You can also generate a JWT token and send it back to the client for authentication if needed
        // Implement JWT generation here

        res.json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

module.exports = registrationRoutes;