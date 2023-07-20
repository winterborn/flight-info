import { useState } from "react";

import FlightList from "../components/FlightList";

const Home = () => {
  const [filter, setFilter] = useState<"all" | "arrivals" | "departures">(
    "all"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  // console.log("Home - searchTerm:", searchTerm);

  return (
    <div className="homepage">
      <div className="filter-buttons">
        <button
          className="filter-buttons__button"
          onClick={() => setFilter("all")}
        >
          All Flights
        </button>
        <button
          className="filter-buttons__button"
          onClick={() => setFilter("arrivals")}
        >
          Arrivals
        </button>
        <button
          className="filter-buttons__button"
          onClick={() => setFilter("departures")}
        >
          Departures
        </button>
        <div className="filter-input">
          <input
            className="filter-input__input"
            type="text"
            placeholder="Search by airline name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      <FlightList filter={filter} searchTerm={searchTerm} />
    </div>
  );
};

export default Home;
