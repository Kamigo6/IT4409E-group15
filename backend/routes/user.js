const express = require('express');
const UserController = require('../controllers/UserController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, UserController.find);

router.get('/:id', isAuth, UserController.findOne);

router.put("/:id", isAuth, UserController.update);

router.delete("/:id", isAuth, UserController.delete);

router.post('/order', isAuth, UserController.placeOrder);


module.exports = router;