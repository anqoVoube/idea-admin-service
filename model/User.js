const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Permission'
    }],
    company: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Company'
    }
});


module.exports = mongoose.model("User", userSchema);