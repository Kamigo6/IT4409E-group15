const { User } = require('../models/User');
const { Order } = require('../models/Order');

module.exports = {
    find: async (req, res) => {
        const queryResponse = await User.find({}).exec();
        res.status(200).json(queryResponse);
    },
    findOne: async (req, res) => {
        const id = parseInt(req.params.id);
        const queryResponse = await User.findById(id).exec();
        res.json(queryResponse);
    },
    update: () => {

    },
    delete: () => {

    },
    placeOrder: async (req, res) => {
        const newOrder = new Order();
        const user = await User.findById('642fdc8e171e34afcaee3a35').exec();
        newOrder.save()
            .then(() => {
                user.clearCart();
                res.status(201).send({
                    message: "Order created"
                }
                )
            })
            .catch((err) => res.status(400).send(err));
    }
};