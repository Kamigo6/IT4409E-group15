const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  delivery: {
    name: {
      type: String,
      required: true
    },
    shippingAddress: {
      address: {
        type: String,
        required: true
      },
      district: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      }
    },
    fee: {
      type: Number,
      required: true
    }
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon'
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
