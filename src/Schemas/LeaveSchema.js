const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    channelId: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('LeaveChannel', LeaveSchema);