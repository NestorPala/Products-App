import { Response } from "express";
import { ProductSchema } from "@interfaces/ProductSchema.js";

export interface ProductResponse extends Response {
    product?: ProductSchema
};