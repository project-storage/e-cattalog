const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
        unique: false
    },
    price : {
        type : String,
        require : true,
        unique : false
    },
    description : {
        type : String,
        require : true,
        unique : false
    },
    type : {
        type : String,
        require : true,
        unique : false
    },
    image : {
        type : String,
        require : true,
        unique : false
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)