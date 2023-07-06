const express = require('express');
const CustomerController = require('../controllers/CustomerController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', isAuth, CustomerController.getAllCustomers);

router.get('/token', isAuth, CustomerController.getCustomerByToken);

router.get('/:id', isAuth, CustomerController.getCustomerById);

router.post("/", isAuth, CustomerController.createCustomer);

router.patch("/:id", isAuth, CustomerController.updateCustomerById);

router.delete("/:id", isAuth, CustomerController.deleteCustomerById);

module.exports = router;