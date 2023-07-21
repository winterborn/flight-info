import { useState, useEffect, FC } from "react";
import { Link } from "react-router-dom";

import { Flight, FlightFilter } from "../types/types";

const FlightList: FC<FlightFilter> = ({ filter, searchTerm }) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);

  // console.log("FlightList - searchTerm:", searchTerm);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        let baseUrl = "http://localhost:4000/api/flights";
        let path = "/";

        if (filter === "arrivals") {
          path = "/arrivals";
        } else if (filter === "departures") {
          path = "/departures";
        }

        const endpoint = baseUrl + path;

        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const json = await response.json();

        setFlights(json);
        setError(null);
      } catch (error) {
        console.error("Error fetching flights:", error);
        setError(
          `An error occurred while fetching flights. Please try again later.`
        );
      } finally {
        // Set isLoading to false after initial fetch
        setIsLoading(false);
        if (isInitialMount) {
          setIsInitialMount(false);
        }
      }
    };

    fetchFlights();
  }, [filter, isInitialMount]);

  // Filter flights based on searchTerm and filter
  const filteredFlights = flights.filter((flight) => {
    const airlineMatch = flight.Airline.toLowerCase().includes(
      searchTerm.toLowerCase()
    );
    if (filter === "all") {
      return airlineMatch;
    } else if (filter === "arrivals") {
      return flight.ArrDep === "A" && airlineMatch;
    } else if (filter === "departures") {
      return flight.ArrDep === "D" && airlineMatch;
    } else {
      return false;
    }
  });

  const noFlightsMessage = (
    <p className="no-flights-message">
      No flights found for the given airline.
    </p>
  );

  const isLoadingMessage = (
    <p className="is-loading-message">Loading flight data...</p>
  );

  const renderErrorMessage = () => {
    if (error) {
      return <p>{error}</p>;
    }
    return null;
  };

  return (
    <div className="flight-list">
      <h2>
        {filter === "all"
          ? "All Flights"
          : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>
      {error && <div className="error-message">{renderErrorMessage()}</div>}
      {isLoading && isInitialMount && isLoadingMessage}
      {!error &&
        filteredFlights.length === 0 &&
        !isInitialMount &&
        noFlightsMessage}
      {!error &&
        !isLoading &&
        !isInitialMount &&
        filteredFlights.map((flight) => (
          <div
            data-testid="flight-details"
            className="flight-details"
            key={flight.FlightNo}
          >
            <img src={flight.Image} alt="" />
            <h2>
              {flight.FlightNo} {flight.Airline}
            </h2>
            <p>
              {flight.Date} {flight.Time}
            </p>
            <p>{flight.PortOfCallA}</p>
            <p>{flight.Status}</p>

            <Link to={`/flight/${flight.FlightNo}`} state={{ filter }}>
              <h3 className="details-button">Details</h3>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FlightList;
