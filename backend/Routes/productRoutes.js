const express = require('express')
const productRoutes = express.Router();
const Product  = require('../models/Product');
const User = require("../models/User"); // Import your Product model
const CartItem = require("../models/CartItem");
const Category = require('../models/Category');
const Subcategory = require('../models/Subcategory');


// Create a new product with photo path
productRoutes.post('/products', async (req, res) => {
    try {
        const { name, description, price, CategoryId, SubcategoryId, photography_url } = req.body;

        const newProduct = await Product.create({
            name: name,
            description: description,
            price: price,
            photography_url: photography_url, // Save the photo path
            CategoryId: CategoryId,
            SubcategoryId: SubcategoryId,
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Unable to create product' });
    }
});

// Get a list of products
// productRoutes.get('/products', async (req, res) => {
//     try {
//         const products = await Product.findAll();
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Unable to fetch products' });
//     }
// });
productRoutes.get('/products', async (req, res) => {
    try {
        const { _page, _limit } = req.query;

        // Если _page и _limit не предоставлены, получаем все продукты
        if (!_page && !_limit) {
            const allProducts = await Product.findAll();
            res.status(200).json(allProducts);
            return; // Выходим из обработчика после отправки ответа
        }

        const page = parseInt(_page, 10) || 1;
        const limit = parseInt(_limit, 10) || 10;

        const products = await Product.findAll({
            offset: (page - 1) * limit,
            limit: limit,
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Unable to fetch products' });
    }
});
productRoutes.get('/cartitems/products', async(req,res) => {
    try {
        const cartItems = await CartItem.findAll();
        const productIds = cartItems.map((cartItem) => cartItem.id)
        const products = await Product.findAll({where: {id: productIds}});
        if (!products) {
            return res.status(404).json({error: "Products not found"});
        }
        res.status(200).json(products);
    } catch (error) {
    return res.status(500).json({error: "Unable to fetch cartitem products"});
}
});

productRoutes.get('/products/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;

        // Fetch the product details by its ID
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const productCategory = await Category.findByPk(product.CategoryId);
        const productSubcategory = await Subcategory.findByPk(product.SubcategoryId);
        return res.status(200).json({product:product,category:productCategory,subcategory:productSubcategory});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to fetch product details' });
    }

});
productRoutes.get('/products/subcategory/:subcategoryId', async(req,res) =>{
    try {
        const subcategoryId = req.params.subcategoryId;
        const products = await Product.findAll({where: {SubcategoryId: subcategoryId}});
        if (!products) {
            console.log({error: 'Products not found'});
        }
        return res.status(200).json(products);
    }   catch(error){
        console.error(error);
        return res.status(500).json({error:"Unable to fetch products"});
    }

});
productRoutes.get('/products/category/:categoryId', async(req,res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await Product.findAll({where: {CategoryId: categoryId}});
        if (!products) {
            console.log({error: 'Products not found'});
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Unable to fetch products"});
    }
});
productRoutes.delete('/products/:productId', async(req,res) =>{
    try {
        const {productId} = req.params;
        const product = await Product.findByPk(productId);
        if(!product){
            return res.status(404).json({error:'Product not found'});
        }
        await product.destroy();
        return res.status(204).send();
    } catch(error){
        return res.status(500).json({error: 'Unable to delete Product'});
    }

});
productRoutes.delete('/products/multiple/delete-multiple', async (req, res) => {
    try {
        const { productIds } = req.body;

        // Check if productIds is an array
        if (!Array.isArray(productIds)) {
            return res.status(400).json({ error: 'productIds must be an array' });
        }

        // Find and delete products with the specified IDs
        await Product.destroy({
            where: {
                id: productIds
            }
        });

        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete products' });
    }
});
productRoutes.put('/products/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product fields based on the request body
        const { name, description, price, CategoryId, SubcategoryId, photography_url } = req.body;

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.CategoryId = CategoryId || product.CategoryId;
        product.SubcategoryId = SubcategoryId || product.SubcategoryId;
        product.photography_url = photography_url || product.photography_url;

        await product.save();

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to update Product' });
    }
});
module.exports = productRoutes;