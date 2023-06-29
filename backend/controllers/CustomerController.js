const Customer = require('../models/Customer');

const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

const getCustomerByToken = async (req, res) => {
    const customerId = req.customerId;
    if (!customerId) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    try {
        const customer = await Customer.findById(customerId).populate('cart.productId').populate('wishList.productId');
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

const createCustomer = async (req, res) => {
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
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
    }
};

const updateCustomerById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const customer = await Customer.findByIdAndUpdate(id, updateData, { new: true });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

const deleteCustomerById = async (req, res) => {
    const { id } = req.params;
    try {
        const customer = await Customer.findByIdAndDelete(id);
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
};

module.exports = {
    getAllCustomers,
    getCustomerByToken,
    createCustomer,
    updateCustomerById,
    deleteCustomerById
};
