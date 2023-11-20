const express = require('express')
const userRoutes = express.Router();
const User = require('../models/User');
const Subcategory = require("../models/Subcategory");
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
userRoutes.delete('/users/:userId', async(req,res) =>{
    try {
        const {userId} = req.params;
        const user = await User.findByPk(userId);
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        await user.destroy();
        return res.status(204).send();
    } catch(error){
        return res.status(500).json({error: 'Unable to delete User'});
    }

});
userRoutes.delete('/users/multiple/delete-multiple', async (req, res) => {
    try {
        const { userIds } = req.body;

        // Check if userIds is an array
        if (!Array.isArray(userIds)) {
            return res.status(400).json({ error: 'userIds must be an array' });
        }

        // Find and delete users with the specified IDs
        await User.destroy({
            where: {
                id: userIds
            }
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete users' });
    }
});
userRoutes.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { username, email, password } = req.body;

        // Find the user by ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user properties
        user.username = username || user.username;
        user.email = email || user.email;
        user.password = password || user.password;

        // Save the updated user
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to update user' });
    }
});
module.exports = userRoutes;