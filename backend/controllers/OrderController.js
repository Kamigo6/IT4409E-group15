const Stripe = require('stripe');
const Order = require('../models/Order');

const stripe = new Stripe("sk_test_51NQjlFJ5CbgyGc9KtOiOEEJhLJV3qaeSeIwuW9KVIZJWjZsDlH5txAOfXkHQjE5D2Hyy4z1fZXZcJvvuT0DR7QRY00alzJ6TpE")

const payOrder = async (req, res) => {

  let { amount, id, cus_id } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: `BookStore15 ${cus_id}`,
      confirm: true,
      payment_method: id
    })
    res.status(200).json({
      message: "Payment successful",
      success: true
    })
  } catch (error) {

    res.status(400).json({
      message: "Payment failed",
      success: false
    })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.productId coupon');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate('products.productId coupon');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

const createOrder = async (req, res) => {
  const {
    customerId,
    products,
    delivery,
    coupon,
    totalPrice,
    status,
    createdDate
  } = req.body;

  try {
    const order = new Order({
      customerId,
      products,
      delivery,
      coupon,
      totalPrice,
      status,
      createdDate
    });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

const updateOrderById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

const deleteOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

module.exports = {
  payOrder,
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById
};
