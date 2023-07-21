const flightsData = require("../flights.json");

// GET all flights:
const getFlights = (req, res) => {
  try {
    res.status(200).json(flightsData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};

// GET all arrivals:
const getFlightsArrivals = (req, res) => {
  try {
    const flightsArrivals = flightsData.filter(
      (flight) => flight.ArrDep === "A"
    );
    res.status(200).json(flightsArrivals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight arrivals" });
  }
};

// GET all departures:
const getFlightsDepartures = (req, res) => {
  try {
    const flightsDepartures = flightsData.filter(
      (flight) => flight.ArrDep === "D"
    );
    res.status(200).json(flightsDepartures);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight departures" });
  }
};

// GET single flight:
const getFlight = (req, res) => {
  try {
    const { FlightNo } = req.params;
    const flight = flightsData.find((flight) => flight.FlightNo === FlightNo);

    if (flight) {
      res.status(200).json(flight);
    } else {
      return res.status(404).json({ error: `Flight ${FlightNo} not found` });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch flight ${FlightNo}` });
  }
};

module.exports = {
  getFlights,
  getFlightsArrivals,
  getFlightsDepartures,
  getFlight,
};
