const express = require('express')
const categoryRoutes = express.Router();
const Category = require('../models/Category');
categoryRoutes.post('/categories',async (req,res) =>{
    try {
        const {name} = req.body;

        const category = Category.create({name:name});
        return res.status(201).json(category);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Unable to add category'});
    }
});
categoryRoutes.get('/categories', async (req, res) => {
    try {
        // Find all categories
        const categories = await Category.findAll();

        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch categories' });
    }
});
module.exports = categoryRoutes;