// Imports & Set Up:
require("dotenv").config();
const express = require("express");
const cors = require('cors');

const flightRoutes = require('./routes/flightRoutes')

// Express app setup:
const app = express();

// Allow requests from a specific origin (http://localhost:3000)
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware:
app.use(express.json())

// Log requests:
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes:
app.use('/api/flights', flightRoutes)

// listen for requests:
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
