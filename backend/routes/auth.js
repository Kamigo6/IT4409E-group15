const express = require('express');
const AuthController = require('../controllers/AuthController');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.patch('/change-password',isAuth ,AuthController.changePassword);

module.exports = router;