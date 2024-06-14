const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.ObjectId,
        ref: "Customer"
    },
    products: [
        {
            product: {
                type: mongoose.ObjectId,
                ref: "Product",
                required: true
            },
            discount: {
                type: Number,
                required: true
            },
            finalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    sale: {
        type: mongoose.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
