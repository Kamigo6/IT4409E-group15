const express = require('express');
const OrderController = require('../controllers/OrderController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, OrderController.find);

router.get('/:id', isAuth, OrderController.findOne);

router.post("/", isAuth, OrderController.create);

router.patch("/:id", isAuth, OrderController.update);

router.delete("/:id", isAuth, OrderController.delete);

module.exports = router;