const express = require('express')
const subcategoryRoutes = express.Router();
const Subcategory = require('../models/Subcategory');
subcategoryRoutes.post('/subcategories', async (req, res) => {
    try {
        const { name, CategoryId} = req.body;


        // Create a new subcategory
        const subcategory = await Subcategory.create({
            name:name,
            CategoryId: CategoryId,
        });

        return res.status(201).json(subcategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to add subcategory' });
    }
});
subcategoryRoutes.get('/subcategories', async (req, res) => {
    try {
        // Find all subcategories
        const subcategories = await Subcategory.findAll();

        return res.status(200).json(subcategories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch subcategories' });
    }
});
subcategoryRoutes.get('/categories/:categoryId/subcategories', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Fetch subcategories for the specified category
        const subcategories = await Subcategory.findAll({
            where: { CategoryId: categoryId },
        });

        return res.status(200).json(subcategories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch subcategories' });
    }
});
module.exports = subcategoryRoutes;