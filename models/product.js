const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: false,
    },
    createdAt: { 
        type: Date, 
        expires: '1m', 
        default: Date.now 
    }
});

module.exports = mongoose.model("Product", productSchema);