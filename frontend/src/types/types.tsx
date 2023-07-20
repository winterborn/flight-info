export type Flight = {
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

export type FlightFilter = {
  filter: "all" | "arrivals" | "departures";
  searchTerm: string;
}
