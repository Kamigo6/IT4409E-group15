const express = require('express');
const userRoutes = require('./user');
const authRoutes = require('./auth');
const productRoutes = require('./product');
const orderRoutes = require('./order');

const router = express.Router();

router.get('/status', (req, res) => res.send('Server is up'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

// handle 404 not found
router.use((req, res) => {
    res.status(404).json({message: "page not found"})
})

module.exports = router;