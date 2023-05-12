const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sellerId: {type: mongoose.Types.ObjectId, required: true},
    description: {type: String},
    categories: [{type: String}],
    price: {type: Number, required: true},
    imageURLs: [{type: String, required: true}],
    active: {type: Boolean, required: true, default: true},
    createdAt: { type: Date, required: true, default: Date.now, immutable: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = {Product};