const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.route('/refresh-token');

router.route('/send-password-reset');

router.route('/reset-password');

module.exports = router;