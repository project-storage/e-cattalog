const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ['นาย.', 'นาง.', 'น.ส.', 'Mr.', 'Ms.']
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    tel: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    sale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
