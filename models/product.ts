import mongoose from "mongoose";
import { ProductSchema } from "@interfaces/ProductSchema.js";

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

export default mongoose.model<ProductSchema>("Product", productSchema);