const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    _id: {type: String, required: true},
    name: {type: String, required: true},
    parent: [{type: String}]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = {Category};

