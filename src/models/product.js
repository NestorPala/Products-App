import mongoose from "mongoose";
export const productSchema = new mongoose.Schema({
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
export default mongoose.model("Product", productSchema);
