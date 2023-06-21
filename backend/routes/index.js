const express = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const productRoutes = require('./product');
const ratingRoutes = require('./rating');
const orderRoutes = require('./order');
const couponRoutes = require('./coupon');

const router = express.Router();

router.get('/status', (req, res) => res.send('Server is up'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/ratings', ratingRoutes);
router.use('/orders', orderRoutes);
router.use('/coupons', couponRoutes);

router.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

module.exports = router;
