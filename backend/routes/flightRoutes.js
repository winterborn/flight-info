const express = require("express");
const router = express.Router();
const {
  getFlights,
  getFlightsArrivals,
  getFlightsDepartures,
  getFlight,
} = require("../controllers/flightController");

// Routes:

// GET all flights:
router.get("/", getFlights);

// GET all arrivals:
router.get("/arrivals", getFlightsArrivals);

// GET all departures:
router.get("/departures", getFlightsDepartures);

// GET single flight:
router.get("/flight/:FlightNo", getFlight);

// POST new flight:
router.post("/", (req, res) => {
  res.json();
});

module.exports = router;
