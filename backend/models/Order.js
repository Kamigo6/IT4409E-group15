const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    detail: [{
        _id: false,
        sellerId: {type: mongoose.Types.ObjectId, ref: 'User'},
        productId: {type: mongoose.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number},
        pricePerUnit: {type: Number}
    }],
    orderDate: { type: Date, required: true, default: Date.now, immutable: true }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };