const jwt = require('jsonwebtoken');
const { User } = require('../models/User');
require('dotenv').config();

module.exports = {
    login: async (req, res) => {
        const username = req.body.username;
        console.log(username)
        const queryResponse = await User.findOne({ username: req.body.username }).exec();
        if (queryResponse && queryResponse.validPassword(req.body.password)) {
            const token = jwt.sign({ _id: queryResponse._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });
            res.status(200).json({ token: token });
        }
        else {
            res.status(400).send({ message: "Thông tin đăng nhập không chính xác" });
        }
    },
    register: async (req, res) => {
        const found = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }, { phone: req.body.phone }] }).exec();
        if (found) {
            res.status(400).send({ message: "Tài khoản này đã được đăng kí" });
        }
        else {
            const newUser = new User(req.body);
            newUser.cart = [];
            newUser.setPassword(req.body.password);
            newUser.save()
                .then(() => res.status(201).send({
                    message: "Đăng kí thành công"
                }))
                .catch((err) => res.status(400).send(err));
        }
    },
    logout: function (req, res) {
        req.logout();
        return res.back();
    }
};