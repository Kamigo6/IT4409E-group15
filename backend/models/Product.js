const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    imageUrls: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        value: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            default: ''
        }
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
