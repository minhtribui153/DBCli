const mongoose = require('mongoose');

const CurrencyProfileSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    wallet: {
        type: Number,
        required: false,
        default: 1000
    },
    bank: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = mongoose.model('CurrencyProfile', CurrencyProfileSchema, 'currencyitem');