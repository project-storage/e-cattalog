const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName : {
        type: String,
        require : true,
        unique : true
    },
    lastName : {
        type : String,
        require : true,
        unique : true
    },
    email : {
        type: String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        require : true,
        unique : true
    },
    role : {
        type : String,
        require : true,
        unique : true
    },
    tel : {
        type : String,
        require : true,
        unique : true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("employee", employeeSchema)