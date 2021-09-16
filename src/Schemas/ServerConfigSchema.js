const mongoose = require('mongoose');

const ServerConfigSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('ServerConfiguration', ServerConfigSchema);