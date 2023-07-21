// flightController.spec.js

const {
  getFlights,
  getFlightsArrivals,
  getFlightsDepartures,
  getFlight,
} = require("../controllers/flightController");

// Mock flightController
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

// Mock response
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Flight Controller", () => {
  describe("getFlights", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all flights", () => {
      // Given
      const req = {};

      getFlights.mockImplementation((req, res) => {
        res.status(200).json(flightsData);
      });

      // When
      getFlights(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(flightsData);
      expect(res.json.mock.calls[0][0]).toHaveLength(2);
    });
  });

  describe("getFlightsArrivals", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all flight arrivals", () => {
      // Given
      const req = {};

      getFlightsArrivals.mockImplementation((req, res) => {
        try {
          const flightsArrivals = flightsData.filter(
            (flight) => flight.ArrDep === "A"
          );
          res.status(200).json(flightsArrivals);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch flight arrivals" });
        }
      });

      // When
      getFlightsArrivals(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        flightsData.filter((flight) => flight.ArrDep === "A")
      );
      expect(res.json.mock.calls[0][0]).toHaveLength(1);
      expect(res.json.mock.calls[0][0][0].FlightNo).toBe("FL001");
    });
  });

  describe("getFlightsDepartures", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return all flight departures", () => {
      // Given
      const req = {};

      getFlightsDepartures.mockImplementation((req, res) => {
        try {
          const flightsDepartures = flightsData.filter(
            (flight) => flight.ArrDep === "D"
          );
          res.status(200).json(flightsDepartures);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch flight departures" });
        }
      });

      // When
      getFlightsDepartures(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        flightsData.filter((flight) => flight.ArrDep === "D")
      );
      expect(res.json.mock.calls[0][0]).toHaveLength(1);
      expect(res.json.mock.calls[0][0][0].FlightNo).toBe("FL002");
    });
  });

  describe("getFlight", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a single flight by FlightNo", () => {
      // Given
      const flightNo = "FL001";
      const req = {
        params: {
          FlightNo: flightNo,
        },
      };

      getFlight.mockImplementation((req, res) => {
        const flight = flightsData.find(
          (flight) => flight.FlightNo === req.params.FlightNo
        );
        if (!flight) {
          res.status(404).json({ message: "Flight not found" });
        } else {
          res.status(200).json(flight);
        }
      });

      // When
      getFlight(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(flightsData[0]);
      expect(res.json.mock.calls[0][0].FlightNo).toBe(flightNo);
    });

    it("should return a 404 status if the FlightNo is not found", () => {
      // Given
      const flightNo = "FL005";
      const req = {
        params: {
          FlightNo: flightNo,
        },
      };

      getFlight.mockImplementation((req, res) => {
        const flight = flightsData.find(
          (flight) => flight.FlightNo === req.params.FlightNo
        );
        if (!flight) {
          res.status(404).json({ message: "Flight not found" });
        } else {
          res.status(200).json(flight);
        }
      });

      // When
      getFlight(req, res);

      // Then
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Flight not found" });
    });
  });
});
