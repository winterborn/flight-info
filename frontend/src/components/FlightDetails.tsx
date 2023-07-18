import { Flight } from "../pages/Home";

const FlightDetails: React.FC<{ flight: Flight }> = (props) => {
  return (
    <div className="flight-details">
      <h4>FLIGHT: {props.flight.FlightNo}</h4>
      <p>Date: {props.flight.Date}</p>
      <p>Time: {props.flight.Time}</p>
      <p>Arrival/Departure: {props.flight.ArrDep}</p>
      <p>Port of Call: {props.flight.PortOfCallA}</p>
      <p>Status: {props.flight.Status}</p>
      <p>Other Info: {props.flight.OtherInfo}</p>
      <p>Additional: {props.flight.Additional}</p>
      <p>Airline: {props.flight.Airline}</p>
      <p>Arrival Hall: {props.flight.ArrHall}</p>
    </div>
  );
};

export default FlightDetails;
