const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: false
    },
    slug: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true,
        unique: false
    },
    description: {
        type: String,
        require: true,
        unique: false
    },
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)