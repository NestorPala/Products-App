import { Response } from "express";
import { ProductSchema } from "./ProductSchema.js";

export interface ProductResponse extends Response {
    product?: ProductSchema
};