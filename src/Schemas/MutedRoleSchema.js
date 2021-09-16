const mongoose = require('mongoose');

const MutedRoleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    roleId: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model('MutedRole', MutedRoleSchema);