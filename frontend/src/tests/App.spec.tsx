// src/tests/App.spec.tsx

import { render, screen } from "@testing-library/react";
import App from "../App";
import Home from "../pages/Home";

describe("App", () => {
  it("Given the App is rendered, then it should contain the Navbar", () => {
    // Given
    render(<App />);

    // When
    const navbarElement = screen.getByText("Flight Information");

    // Then
    expect(navbarElement).toBeInTheDocument();
  });

  it("Given the Home component is rendered, then it should contain the expected component", () => {
    // Given
    render(<Home />);

    // When
    const homeElement = screen.getByTestId("home-component");

    // Then
    expect(homeElement).toBeInTheDocument();
  });
});
