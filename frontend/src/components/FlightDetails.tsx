import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Flight } from "../types/types";

const FlightDetails: FC = () => {
  const { FlightNo } = useParams();
  const [flightDetails, setFlightDetails] = useState<Flight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/flights/flight/${FlightNo}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const flightData = await response.json();
        setFlightDetails(flightData);
        setError(null);
      } catch (error) {
        console.error("Error fetching flight details:", error);
        setError("Error fetching flight details. Please try again later.");
      }
    };

    fetchFlightDetails();
  }, [FlightNo]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderErrorMessage = () => {
    if (error) {
      return <p>{error}</p>;
    }
    return null;
  };

  return (
    <div className="flights">
      <div className="filter-buttons">
        <button className="filter-buttons__button" onClick={handleGoBack}>
          Back
        </button>
      </div>
      {error && <div className="flight-details">{renderErrorMessage()}</div>}
      {!error && flightDetails && (
        <div>
          <div className="flight-details">
            <img src={flightDetails.Image} alt="" />
            <h2>Flight: {flightDetails.FlightNo}</h2>
            <p>Date: {flightDetails.Date}</p>
            <p>Time: {flightDetails.Time}</p>
            <p>Arrival/Departure: {flightDetails.ArrDep}</p>
            <p>Port of Call: {flightDetails.PortOfCallA}</p>
            <p>Status: {flightDetails.Status}</p>
            <p>Other Info: {flightDetails.OtherInfo}</p>
            <p>Additional: {flightDetails.Additional}</p>
            <p>Airline: {flightDetails.Airline}</p>
            <p>Arrival Hall: {flightDetails.ArrHall}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;
