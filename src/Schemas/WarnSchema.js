const mongoose = require('mongoose');

const WarnSchema = new mongoose.Schema({
    guild: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    content: {
        type: Array,
        required: true,
    },
});

module.exports = mongoose.model("Warning", WarnSchema);