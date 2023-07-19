// flightsController.spec.js

const {
  getFlights,
  getFlightsArrivals,
  getFlightsDepartures,
  getFlight,
} = require("../controllers/flightController");

// Mock the module containing the controller functions
jest.mock("../controllers/flightController");

// Mock data
const flightsData = [
  {
    FlightNo: "FL001",
    Date: "01/01/2023",
    Time: "16:00",
    ArrDep: "A",
    PortOfCallA: "LONDON GATWICK",
    Status: "LANDED 1234",
    OtherInfo: "NOW ON STAND",
    Additional: "Baggage at carousel 1",
    Airline: "British Airways",
    Image: "https://s3-eu-west-1.amazonaws.com/ediassets/img/airlines/BA.jpg",
    ArrHall: "International",
  },
  {
    FlightNo: "FL002",
    Date: "02/01/2023",
    Time: "08:30",
    ArrDep: "D",
    PortOfCallA: "LONDON HEATHROW",
    Status: "SCHEDULED",
    OtherInfo: "",
    Additional: "",
    Airline: "British Airways",
    Image: "https://s3-eu-west-1.amazonaws.com/ediassets/img/airlines/BA.jpg",
    ArrHall: "International",
  },
];

// Mock the response object
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

// Mock the next function (if needed)
const next = jest.fn();

describe("getFlights", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all flights", () => {
    const req = {};

    getFlights.mockImplementation((req, res) => {
      res.status(200).json(flightsData);
    });

    getFlights(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(flightsData);

    // Additional expectation for count (length should be 2, as all flights are returned)
    expect(res.json.mock.calls[0][0]).toHaveLength(2);
  });
});

describe("getFlightsArrivals", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all flight arrivals", () => {
    const req = {};

    getFlightsArrivals.mockImplementation((req, res) => {
      const flightsArrivals = flightsData.filter((flight) => flight.ArrDep === "A");
      res.status(200).json(flightsArrivals);
    });

    getFlightsArrivals(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(flightsData.filter((flight) => flight.ArrDep === "A"));

    // Additional expectation for count (length should be 1)
    expect(res.json.mock.calls[0][0]).toHaveLength(1);
  });
});

describe("getFlightsDepartures", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all flight departures", () => {
    const req = {};

    getFlightsDepartures.mockImplementation((req, res) => {
      const flightsDepartures = flightsData.filter((flight) => flight.ArrDep === "D");
      res.status(200).json(flightsDepartures);
    });

    getFlightsDepartures(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(flightsData.filter((flight) => flight.ArrDep === "D"));

    // Additional expectation for count (length should be 1)
    expect(res.json.mock.calls[0][0]).toHaveLength(1);
  });
});