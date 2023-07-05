const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id).populate({
            path: "ratings",
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

const getProductsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const products = await Product.find({ categories: category });

        res.json(products);
    } catch (error) {
        console.error('Error retrieving products by category:', error);
        res.status(500).json({ error: 'Failed to retrieve products by category' });
    }
};

const createProduct = async (req, res) => {
    const {
        supplier,
        name,
        categories,
        detail,
        imageUrls,
        price,
        discount,
        isAvailable,
        ratings
    } = req.body;
    try {
        const product = await Product.create({
            supplier,
            name,
            categories,
            detail,
            imageUrls,
            price,
            discount,
            isAvailable,
            ratings
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
};

const updateProductById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, updateData, {
            new: true
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
};

const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProductById,
    deleteProductById
};
