import mongoose from "mongoose";

export interface ProductSchema extends mongoose.Document {
    name: string,
    price: number,
    stock: number,
    createdAt: mongoose.Date
}