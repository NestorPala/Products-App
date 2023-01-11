import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url)).replace("src", "");
// Allowing not to appear CORS error
app.use(cors({ origin: '*' }));
// Allowing server to handle json requests
app.use(json());
//Using directory for serving static files
app.use(express.static(__dirname + '/app/dist/e-commerce_app_backend'));
//Setting up the main endpoint
app.get('/', (req, res) => {
    res.send(`<h1>${__dirname + '/app/dist/e-commerce_app_backend'}</h1>`);
});
// Setting up a router
app.use("/products", productsRouter);
// Opening the server after connecting to the DB
connect(process.env.DATABASE_URL)
    .then(() => {
    console.log("Connected to Database");
    app.listen(port, () => console.log('Server ready on port ' + port));
}, err => console.error(err));
