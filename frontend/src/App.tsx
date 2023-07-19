import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages & Components:
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import FlightDetails from "./components/FlightDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/flight/:FlightNo" element={<FlightDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
