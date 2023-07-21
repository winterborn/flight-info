// src/tests/Navbar.spec.tsx

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  it("should render the Navbar with header text", () => {
    // Given
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // When
    const headerElement = screen.getByRole("heading", {
      name: /Flight Information/i,
    });

    // Then
    expect(headerElement).toBeInTheDocument();
  });

  it("should render the Navbar with link to home", () => {
    // Given
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    // When
    const linkElement = screen.getByRole("link", {
      name: /Flight Information/i,
    });

    // Then
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
