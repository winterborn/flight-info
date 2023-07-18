import { useEffect, useState } from "react";
import FlightDetails from "../components/FlightDetails";

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

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/flights");
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const json = await response.json();
        setFlights(json);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="home">
      <div className="flights">
        {flights && flights.map((flight) => (
          <FlightDetails key={flight.FlightNo} flight={flight}/>
        ))}
      </div>
    </div>
  );
};

export default Home;
