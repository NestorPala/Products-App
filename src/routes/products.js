var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import Product from "../models/product.js"; // Using the model "Product"
const router = express.Router();
// Endpoint: Getting all products
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product.find();
        res.json(products);
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Getting one product
router.get("/:id", getProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(res.product);
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Creating one product
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.price <= 0) {
        return res.status(400).json({ message: "Price has to be greater than zero" });
    }
    if (req.body.stock != null) {
        return res.status(400).json({ message: "Use '/:id/addstock' to modify the product stock" });
    }
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: 0,
    });
    try {
        try {
            yield product.save();
            res.status(201).json({ message: "Product added successfully" });
        }
        catch (requestError) {
            res.status(400).json({ message: requestError.message });
        }
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Updating one product
router.patch("/:id", getProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            // Checking if json of PATCH request has valid properties
            if (req.body.stock != null) {
                return res.status(400).json({
                    message: "Use '/:id/addstock' to modify the product stock"
                });
            }
            if (req.body.name != null) {
                res.product.name = req.body.name;
            }
            if (req.body.price != null) {
                res.product.price = req.body.price;
            }
            const updatedProduct = yield res.product.save();
            res.json(updatedProduct);
        }
        catch (requestError) {
            res.status(400).json({ message: requestError.message });
        }
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Adding stock to one product
router.patch('/:id/addstock', getProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let incomingStock = req.body.incomingStock;
        if (incomingStock == null) {
            return res.status(400).json({
                message: "Add 'incomingStock' property to use this endpoint"
            });
        }
        if (incomingStock === "" || isNaN(incomingStock)) {
            return res.status(400).json({ message: "'incomingStock' property must be a number" });
        }
        if (incomingStock <= 0) {
            return res.status(400).json({
                message: "Incoming stock must be greater than zero"
            });
        }
        const oldStock = res.product.stock;
        res.product.stock += parseInt(incomingStock);
        yield res.product.save();
        const newStock = (yield Product.findById(req.params.id)).stock;
        res.status(200).json({
            message: `Product stock has been increased from ${oldStock} to ${newStock}`
        });
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Removing stock from one product
router.patch('/:id/removestock', getProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let outgoingStock = req.body.outgoingStock;
        if (outgoingStock == null) {
            return res.status(400).json({
                message: "Add 'outgoingStock' property to use this endpoint"
            });
        }
        if (outgoingStock === "" || isNaN(outgoingStock)) {
            return res.status(400).json({ message: "'outgoingStock' property must be a number" });
        }
        if (outgoingStock <= 0) {
            return res.status(400).json({
                message: "'outgoingStock' property must be greater than zero"
            });
        }
        outgoingStock = parseInt(outgoingStock);
        if (res.product.stock - outgoingStock < 0) {
            return res.status(400).json({
                message: `Cannot remove more stock than already existing (Stock remaining: ${res.product.stock})`
            });
        }
        const oldStock = res.product.stock;
        res.product.stock -= outgoingStock;
        yield res.product.save();
        const newStock = (yield Product.findById(req.params.id)).stock;
        res.status(200).json({
            message: `Product stock has been decreased from ${oldStock} to ${newStock}`
        });
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Endpoint: Deleting one product
router.delete("/:id", getProduct, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield res.product.remove();
        res.json({ message: "Product deleted successfully" });
    }
    catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
}));
// Middleware: Checking if product exists
// Returns a Product object
function getProduct(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let product;
        try {
            product = yield Product.findById(req.params.id);
            if (product == null) {
                return res.status(404).json({ message: "Cannot find product" });
            }
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
        // Setting the found (in the database) product as the product to work with
        res.product = product;
        // Passing to the next middleware, or the endpoint if there's no other
        next();
    });
}
export default router;
