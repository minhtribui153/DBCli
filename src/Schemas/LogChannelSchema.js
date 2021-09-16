const mongoose = require('mongoose');

const LogChannelSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('LoggingChannels', LogChannelSchema, 'LoggingChannels');