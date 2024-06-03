const mongoose = require('mongoose')

const roleStatus = ['admin', 'user', 'production']

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.ObjectId,
        ref: "role",
        required: true
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('users', userSchema)