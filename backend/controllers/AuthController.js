const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
require('dotenv').config();

const register = async (req, res) => {
    const {
        username,
        password,
        isAdmin,
        firstName,
        lastName,
        avatarImageUrl,
        mobileNumber,
        email,
        birthday,
        location,
        shippingInformation,
        paymentMethods,
        cart,
        wishList,
        notifications
    } = req.body;

    try {
        const existingCustomer = await Customer.findOne({ username });
        if (existingCustomer) {
            return res.status(400).json({ error: 'Username is already taken' });
        }

        const customer = new Customer({
            username,
            isAdmin,
            firstName,
            lastName,
            avatarImageUrl,
            mobileNumber,
            email,
            birthday,
            location,
            shippingInformation,
            paymentMethods,
            cart,
            wishList,
            notifications
        });
        customer.setPassword(password);

        await customer.save();

        const token = generateToken(customer);

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register customer' });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const customer = await Customer.findOne({ username });
        if (!customer || !customer.validPassword(password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = generateToken(customer);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
};

const generateToken = (customer) => {
    const token = jwt.sign({ customerId: customer._id }, process.env.TOKEN_SECRET);
    return token;
};

module.exports = {
    register,
    login
};
