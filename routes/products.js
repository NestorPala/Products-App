const express = require("express");
const router = express.Router();

// Using the model "Product"
const Product = require("../models/product");


// Endpoint: Getting all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
});

// Endpoint: Getting one product
router.get("/:id", getProduct, async (req, res) => {
    try {
        res.json(res.product);
    } catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
});

// Endpoint: Creating one product
router.post("/", async (req, res) => {
    if (req.body.price <= 0) {
        return res.status(400).json({ message : "Price has to be greater than zero"});
    }
    if (req.body.stock != null) {
        return res.status(400).json({ message : "Use '/:id/addstock' to modify the product stock"});
    }

    const product = new Product({
        name : req.body.name,
        price : req.body.price,
        stock : 0,
    });

    try {
        try {
            await product.save();
            res.status(201).json({ message: "Product added successfully" });
        } catch (requestError) {
            res.status(400).json({ message: requestError.message });
        }
    } catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
});

// Endpoint: Updating one product
router.patch("/:id", getProduct, async (req, res) => {
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

            const updatedProduct = await res.product.save();
            res.json(updatedProduct);

        } catch (requestError) {
            res.status(400).json({ message: requestError.message });
        }
    } catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
});

// Endpoint: Adding stock to one product
router.patch('/:id/addstock', getProduct, async (req, res) => {
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
        await res.product.save();

        const newStock = (await Product.findById(req.params.id)).stock;

        res.status(200).json({ 
            message: `Product stock has been increased from ${oldStock} to ${newStock}`
        })
    } catch (serverError) {
        res.status(500).json({ message: serverError.message});
    }
});

// Endpoint: Removing stock from one product
router.patch('/:id/removestock', getProduct, async (req, res) => {
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
        await res.product.save();

        const newStock = (await Product.findById(req.params.id)).stock;

        res.status(200).json({ 
            message: `Product stock has been decreased from ${oldStock} to ${newStock}`
        })
    } catch (serverError) {
        res.status(500).json({ message: serverError.message});
    }
});

// Endpoint: Deleting one product
router.delete("/:id", getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: "Product deleted successfully" });
    } catch (serverError) {
        res.status(500).json({ message: serverError.message });
    }
});


// Middleware: Checking if product exists
// Returns a Product object
async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // Setting the found (in the database) product as the product to work with
    res.product = product;

    // Passing to the next middleware, or the endpoint if there's no other
    next();
}


module.exports = router;