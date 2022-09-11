require('dotenv').config();

const port = process.env.PORT || 3000;

const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Allowing server to handle json requests
app.use(express.json())

// Using directory for serving static files
app.use(express.static(__dirname + '/public'));

// Setting up the main endpoint
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// Setting up a router
app.use("/products", require("./routes/products"));

// Opening the server after connecting to the DB
mongoose.connect(process.env.DATABASE_URL, 
  () => {
    console.log("Connected to Database");
    app.listen(port, () => console.log('Server ready on port ' + port));
  },
  err => console.error(err)
);