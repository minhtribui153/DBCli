const mongoose = require('mongoose');

const AmongUsCategorySchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    categoryId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('AmongUsCategories', AmongUsCategorySchema, 'AmongUsCategories');