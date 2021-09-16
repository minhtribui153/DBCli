const mongoose = require('mongoose');

const ChatbotSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    guild: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Chatbot", ChatbotSchema);