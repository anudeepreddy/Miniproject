const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkSpace'
    }],
    salt: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    },
    updatedDate: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('User', userSchema);
