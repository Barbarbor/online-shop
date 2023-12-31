const express = require('express')
const categoryRoutes = express.Router();
const Category = require('../models/Category');
categoryRoutes.post('/categories',async (req,res) =>{
    try {
        const {name} = req.body;

        const category = await Category.create({name:name});
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
categoryRoutes.delete('/categories/:categoryId', async(req,res) =>{
    try {
        const {categoryId} = req.params;
        const category = await Category.findByPk(categoryId);
        if(!category){
            return res.status(404).json({error:'Category not found'});
        }
        await category.destroy();
        return res.status(204).send();
    } catch(error){
        return res.status(500).json({error: 'Unable to delete category'});
    }

});
categoryRoutes.delete('/categories/multiple/delete-multiple', async (req, res) => {
    try {
        const { categoryIds } = req.body;

        // Check if categoryIds is an array
        if (!Array.isArray(categoryIds)) {
            return res.status(400).json({ error: `categoryIds must be an array. Req body: ${categoryIds}` });
        }

        // Find and delete categories with the specified IDs
        await Category.destroy({
            where: {
                id: categoryIds
            }
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Unable to delete categories. categoryids: ${req.query.data}` });
    }
});

module.exports = categoryRoutes;