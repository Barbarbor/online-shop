const express = require('express')
const subcategoryRoutes = express.Router();
const Subcategory = require('../models/Subcategory');
const Category = require("../models/Category");
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
        if(!subcategories)
        {
            return res.status(404).json({error:"Subcategories not found"});
        }
        else {
            return res.status(200).json(subcategories);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch subcategories' });
    }
});
subcategoryRoutes.delete('/subcategories/:subcategoryId', async(req,res) =>{
    try {
        const {subcategoryId} = req.params;
        const subcategory = await Subcategory.findByPk(subcategoryId);
        if(!subcategory){
            return res.status(404).json({error:'Subcategory not found'});
        }
        await subcategory.destroy();
        return res.status(204).send();
    } catch(error){
        return res.status(500).json({error: 'Unable to delete Subcategory'});
    }

});
subcategoryRoutes.delete('/subcategories/multiple/delete-multiple', async (req, res) => {
    try {
        const { subcategoryIds } = req.body;

        // Check if subcategoryIds is an array
        if (!Array.isArray(subcategoryIds)) {
            return res.status(400).json({ error: 'subcategoryIds must be an array' });
        }

        // Find and delete subcategories with the specified IDs
        await Subcategory.destroy({
            where: {
                id: subcategoryIds
            }
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete subcategories' });
    }
});


module.exports = subcategoryRoutes;