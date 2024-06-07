const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        require: true,
        unique: true
    },
    price : {
        type : String,
        require : true,
        unique : true
    },
    description : {
        type : String,
        require : true,
        unique : true
    },
    type : {
        type : String,
        require : true,
        unique : true
    },
    image : {
        type : String,
        require : true,
        unique : true
    }

},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("product", productSchema)