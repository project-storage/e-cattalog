const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        lowercase: true,
    }
})

module.exports = mongoose.model("Category", categorySchema)