// src/tests/FlightList.spec.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FlightList from "../components/FlightList";

// Mock Data
const mockFlights = [
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
describe("FlightList", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test("should display loading message when loading flights", () => {
    // Given
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="all" searchTerm="" />
      </MemoryRouter>
    );

    // Then
    const loadingMessage = screen.getByText("Loading flight data...");
    expect(loadingMessage).toBeInTheDocument();
  });

  test("should display error message when issue with fetching flights", async () => {
    // Given
    const fetchMock = jest
      .fn()
      .mockRejectedValueOnce(new Error("Network response was not ok"));
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="all" searchTerm="" />
      </MemoryRouter>
    );

    // Wait for error message to be displayed
    const errorMessage = await screen.findByText(
      "An error occurred while fetching flights. Please try again later."
    );

    // Then
    expect(errorMessage).toBeInTheDocument();
  });

  test("should display flights after loading", async () => {
    // Given
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="all" searchTerm="" />
      </MemoryRouter>
    );

    // Wait for flights to be displayed
    const flightElements = await screen.findAllByTestId("flight-details");
    const flightNos = mockFlights.map((flight) => flight.FlightNo);

    // Then
    expect(flightElements.length).toBe(mockFlights.length);
    flightElements.forEach((element, index) => {
      expect(element).toHaveTextContent(flightNos[index]);
    });
  });

  test("should display arrivals after loading", async () => {
    // Given
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="arrivals" searchTerm="" />
      </MemoryRouter>
    );

    // Wait for flights to be displayed
    const flightElements = await screen.findAllByTestId("flight-details");
    const arrivalFlights = mockFlights.filter(
      (flight) => flight.ArrDep === "A"
    );
    const flightNos = arrivalFlights.map((flight) => flight.FlightNo);

    // Then
    expect(flightElements.length).toBe(arrivalFlights.length);
    flightElements.forEach((element, index) => {
      expect(element).toHaveTextContent(flightNos[index]);
    });
  });

  test("should display departures after loading", async () => {
    // Given
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="departures" searchTerm="" />
      </MemoryRouter>
    );

    // Wait for flights to be displayed
    const flightElements = await screen.findAllByTestId("flight-details");
    const departureFlights = mockFlights.filter(
      (flight) => flight.ArrDep === "D"
    );
    const flightNos = departureFlights.map((flight) => flight.FlightNo);

    // Then
    expect(flightElements.length).toBe(departureFlights.length);
    flightElements.forEach((element, index) => {
      expect(element).toHaveTextContent(flightNos[index]);
    });
  });

  test("should display flights for search term 'British Airways'", async () => {
    // Given
    const searchTerm = "British Airways";
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlights,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter>
        <FlightList filter="all" searchTerm={searchTerm} />
      </MemoryRouter>
    );

    // Wait for flights to be displayed
    const flightElements = await screen.findAllByTestId("flight-details");
    const filteredFlights = mockFlights.filter((flight) =>
      flight.Airline.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const flightNos = filteredFlights.map((flight) => flight.FlightNo);

    // Then
    expect(flightElements.length).toBe(filteredFlights.length);
    flightElements.forEach((element, index) => {
      expect(element).toHaveTextContent(flightNos[index]);
    });
  });
});
