// src/tests/FlightDetails.spec.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import FlightDetails from "../components/FlightDetails";

// Mock Data
const mockFlight = {
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
};

// Tests
describe("FlightDetails", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display flight details after loading", async () => {
    // Given
    const fetchMock = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFlight,
    });
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter initialEntries={[`/flight/${mockFlight.FlightNo}`]}>
        <Routes>
          <Route path="/flight/:FlightNo" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for flight details to be displayed
    const flightDetails = await screen.findByText(
      `Flight: ${mockFlight.FlightNo}`
    );

    // Then
    expect(flightDetails).toBeInTheDocument();
    expect(screen.getByText(`Date: ${mockFlight.Date}`)).toBeInTheDocument();
    expect(screen.getByText(`Time: ${mockFlight.Time}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Arrival/Departure: ${mockFlight.ArrDep}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Port of Call: ${mockFlight.PortOfCallA}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Status: ${mockFlight.Status}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Other Info: ${mockFlight.OtherInfo}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Additional: ${mockFlight.Additional}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Airline: ${mockFlight.Airline}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Arrival Hall: ${mockFlight.ArrHall}`)
    ).toBeInTheDocument();
  });

  test("should display error message when issue with fetching flight details", async () => {
    // Given
    const fetchMock = jest
      .fn()
      .mockRejectedValueOnce(
        new Error("Network response was not ok")
      );
    jest.spyOn(global, "fetch").mockImplementationOnce(fetchMock);

    // When
    render(
      <MemoryRouter initialEntries={[`/flight/${mockFlight.FlightNo}`]}>
        <Routes>
          <Route path="/flight/:FlightNo" element={<FlightDetails />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for error message to be displayed
    const errorMessage = await screen.findByText(
      "Error fetching flight details. Please try again later."
    );

    // Then
    expect(errorMessage).toBeInTheDocument();
  });
});
