const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connection.on('error', (err) => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

const mongoURL = process.env.MONGO_URI;

exports.start = () => {
    mongoose
        .connect(mongoURL, {useNewUrlParser: true})
        .catch((err) => console.log(err));
    return mongoose.connection;
};
