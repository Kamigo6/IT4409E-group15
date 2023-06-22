const express = require('express');
const ProductController = require('../controllers/ProductController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getProductById);

router.post("/", isAuth, ProductController.createProduct);

router.patch("/:id", isAuth, ProductController.updateProductById);

router.delete("/:id", isAuth, ProductController.deleteProductById);

router.get('/category/:category', ProductController.getProductsByCategory);

module.exports = router;