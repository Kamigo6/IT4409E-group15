const { Order } = require('../models/Order');

module.exports = {
    find: async (req, res) => {
        const queryResponse = await Order.find({}).exec();
        res.status(200).json(queryResponse);
    },
    findOne: async (req, res) => {
        try {
            const queryResponse = await Order.findById(req.params.id).exec();
            if (queryResponse) res.status(200).json(queryResponse);
            else res.status(404).json({message: "Order not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        const newOrder = new Order(req.body);
        newOrder.save()
            .then(() => res.status(201).send({
                message: "Order created"
            }))
            .catch((err) => res.status(400).send(err));
    },
    update: async (req, res) => {
        try {
            const queryResponse = await Order.findByIdAndUpdate(req.params.id, req.body);
            console.log(queryResponse);
            if (queryResponse) res.status(200).json({message: "Order updated"});
            else res.status(404).json({message: "Order not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            const queryResponse = await Order.findByIdAndDelete(req.params.id);
            if (queryResponse) res.status(200).json({message: "Order deleted"});
            else res.status(404).json({message: "Order not found"});
        } catch (err) {
            res.status(500).json(err);
        }
    }
};