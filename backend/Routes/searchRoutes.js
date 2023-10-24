// routes/searchRoutes.js

const express = require('express');
const searchRoutes = express.Router();
const Product = require('../models/Product');
const { Op } = require('sequelize');
const customSearch = require('../customSearch');
searchRoutes.get('/product/search', async (req, res) => {
    try {
        const { searchQuery } = req.query;
        // Implement the logic to search for products based on searchQuery
        const products = await Product.findAll();
        const searchResults = customSearch(products, searchQuery);
        res.json(searchResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to search for products' });
    }
});

module.exports = searchRoutes;
