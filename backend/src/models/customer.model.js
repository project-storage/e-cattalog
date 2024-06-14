const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    title: {
        type: String,
        enum: title,
        require: true,
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
    tel: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true,
        unique: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Customer', customerSchema)