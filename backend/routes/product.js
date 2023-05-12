const express = require('express');
const ProductController = require('../controllers/ProductController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', ProductController.find);

router.get('/:id', ProductController.findOne);

router.post("/", isAuth, ProductController.create);

router.patch("/:id", isAuth, ProductController.update);

router.delete("/:id", isAuth, ProductController.delete);

module.exports = router;