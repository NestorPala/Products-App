require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.on("open", () => console.log("Connected to Database"));

app.use(express.json())
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const productsRouter = require("./routes/products");

app.use("/products", productsRouter);

app.listen(port, () => console.log('Server ready on port ' + port));