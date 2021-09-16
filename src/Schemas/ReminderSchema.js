const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    reminder: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('UserReminder', ReminderSchema);