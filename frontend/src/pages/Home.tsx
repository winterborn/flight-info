import { useEffect, useState } from "react";
import FlightList from "../components/FlightList";

export interface Flight {
  FlightNo: string;
  Date: string;
  Time: string;
  ArrDep: string;
  PortOfCallA: string;
  Status: string;
  OtherInfo: string;
  Additional: string;
  Airline: string;
  Image: string;
  ArrHall: string;
}

const Home = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filter, setFilter] = useState<"all" | "arrivals" | "departures">(
    "all"
  );
  const [error, setError] = useState<string | null>(null);

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
      }
    };

    fetchFlights();
  }, [filter]);

  const renderErrorMessage = () => {
    if (error) {
      return <div className="error-message">{error}</div>;
    }
    return null;
  };

  return (
    <div className="flights">
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")}>All Flights</button>
        <button onClick={() => setFilter("arrivals")}>Arrivals</button>
        <button onClick={() => setFilter("departures")}>Departures</button>
      </div>
      {flights && <FlightList flights={flights} filter={filter} />}
      {error && <div className="flight-details">{renderErrorMessage()}</div>}
    </div>
  );
};

export default Home;
