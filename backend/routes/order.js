const express = require('express');
const OrderController = require('../controllers/OrderController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, OrderController.getAllOrders);

router.get('/:id', isAuth, OrderController.getOrderById);

router.post("/", isAuth, OrderController.createOrder);

router.patch("/:id", isAuth, OrderController.updateOrderById);

router.delete("/:id", isAuth, OrderController.deleteOrderById);

module.exports = router;