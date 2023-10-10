const express = require('express')
const userRoutes = express.Router();
const User = require('../models/User');
userRoutes.post('/users', async(req,res) =>{
    try {
        const { username, email, password } = req.body;

        // Create a new user
        const user = await User.create({
            username:username,
            email:email,
            password:password,
        });

        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add user' });
    }
});
userRoutes.get('/users', async (req, res) => {
    try {
        // Find all users
        const users = await User.findAll();

        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch users' });
    }
});


module.exports = userRoutes;