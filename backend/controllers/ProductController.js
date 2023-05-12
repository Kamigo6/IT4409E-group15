const { Product } = require('../models/Product');

module.exports = {
    find: async (req, res) => {
        const queryResponse = await Product.find({}).exec();
        res.status(200).json(queryResponse);
    },
    findOne: async (req, res) => {
        try {
            const queryResponse = await Product.findById(req.params.id).exec();
            if (queryResponse) res.status(200).json(queryResponse);
            else res.status(404).json({message: "Product not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        const newProduct = new Product(req.body);
        newProduct.save()
            .then(() => res.status(201).send({
                message: "Product added"
            }))
            .catch((err) => res.status(400).send(err));
    },
    update: async (req, res) => {
        // TO DO: write middleware that check if the provided id is correct
        // TO DO: write middleware that check if the provided id exists in database
        try {
            const queryResponse = await Product.findByIdAndUpdate(req.params.id, req.body);
            console.log(queryResponse);
            if (queryResponse) res.status(200).json({message: "Product updated"});
            else res.status(404).json({message: "Product not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            const queryResponse = await Product.findByIdAndDelete(req.params.id);
            if (queryResponse) res.status(200).json({message: "Product deleted"});
            else res.status(404).json({message: "Product not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};