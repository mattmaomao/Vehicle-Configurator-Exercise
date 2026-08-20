import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import VehicleSelector from "./VehicleSelector.tsx";
import SeatCoverage from "./SeatCoverage.tsx";
import OptionalUpgrade from "./OptionalUpgrade.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<VehicleSelector />} />
        <Route path="/seat-coverage" element={<SeatCoverage />} />
        <Route path="/optional-upgrades" element={<OptionalUpgrade />} />
      </Routes>
    </Router>
  </StrictMode>,
);
