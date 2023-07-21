// src/tests/Home.spec.tsx

import { render, screen, cleanup } from "@testing-library/react";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render the filter buttons", () => {
    // Given
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // When
    const allFlightsButton = screen.getByRole("button", { name: "All Flights" });
    const arrivalsButton = screen.getByRole("button", { name: "Arrivals" });
    const departuresButton = screen.getByRole("button", { name: "Departures" });

    // Then
    expect(allFlightsButton).toBeInTheDocument();
    expect(arrivalsButton).toBeInTheDocument();
    expect(departuresButton).toBeInTheDocument();
  });

  it("should render the filter input", () => {
    // Given
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // When
    const filterInput = screen.getByPlaceholderText("Search by airline name");

    // Then
    expect(filterInput).toBeInTheDocument();
  });
});
