const mongoose = require('mongoose')

const roleStatus = ['admin', 'user', 'production']

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    firstName: {
        type: String,
        require: true,
        unique: true
    },
    lastName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        enum: roleStatus,
        required: true
    },
    tel: {
        type: String,
        require: true,
        unique: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema)