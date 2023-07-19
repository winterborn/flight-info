import { Link } from "react-router-dom";
import { Flight } from "../pages/Home"; // Import the Flight interface

interface FlightListProps {
  flights: Flight[];
  filter: "all" | "arrivals" | "departures";
}

const FlightList: React.FC<FlightListProps> = ({ flights, filter }) => {
  return (
    <div className="flights">
      <h2>
        {filter === "all"
          ? "All Flights"
          : filter.charAt(0).toUpperCase() + filter.slice(1)}
      </h2>
      {flights.map((flight) => (
        <div className="flight-details" key={flight.FlightNo}>
          <img src={flight.Image} alt="" />
          <h2>
            {flight.FlightNo} {flight.Airline}
          </h2>
          <p>
            {flight.Date} {flight.Time}
          </p>
          <p>{flight.PortOfCallA}</p>
          <p>{flight.Status}</p>

          <div className="filter-buttons">
            <Link to={`/flight/${flight.FlightNo}`} state={{ filter }}>
              <button>Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlightList;
