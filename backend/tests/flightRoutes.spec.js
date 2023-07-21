// flightRoutes.spec.js

const request = require("supertest");
const app = require("../server");
const {
  getFlights,
  getFlightsArrivals,
  getFlightsDepartures,
  getFlight,
} = require("../controllers/flightController");

// Mock flightController
jest.mock("../controllers/flightController", () => ({
  getFlights: jest.fn(),
  getFlightsArrivals: jest.fn(),
  getFlightsDepartures: jest.fn(),
  getFlight: jest.fn(),
}));

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

// Tests
describe("Flight Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET / should return all flights", async () => {
    // Given
    getFlights.mockImplementation((req, res) => {
      res.status(200).json(flightsData);
    });

    // When
    const response = await request(app).get("/api/flights/");

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(flightsData.length);
  });

  it("GET /arrivals should return flight arrivals", async () => {
    // Given
    getFlightsArrivals.mockImplementation((req, res) => {
      res
        .status(200)
        .json(flightsData.filter((flight) => flight.ArrDep === "A"));
    });

    // When
    const response = await request(app).get("/api/flights/arrivals");

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].FlightNo).toBe("FL001");
    expect(response.body[0].ArrDep).toBe("A");
  });

  it("GET /departures should return flight departures", async () => {
    // Given
    getFlightsDepartures.mockImplementation((req, res) => {
      res.status(200).json(flightsData.filter(flight => flight.ArrDep === "D"));
    });

    // When
    const response = await request(app).get("/api/flights/departures");

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].FlightNo).toBe("FL002");
    expect(response.body[0].ArrDep).toBe("D");
  });

  it("GET /flight/:FlightNo should return a specific flight", async () => {
    // Given
    const flightNo = "FL001";
    const specificFlight = flightsData.find(flight => flight.FlightNo === flightNo);
    getFlight.mockImplementation((req, res) => {
      res.status(200).json(specificFlight);
    });

    // When
    const response = await request(app).get(`/api/flights/flight/${flightNo}`);

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toEqual(specificFlight);
  });
});
