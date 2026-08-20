import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VehicleSelector from "./VehicleSelector.tsx";
import SeatCoverage from "./SeatCoverage.tsx";
import OptionalUpgrade from "./OptionalUpgrade.tsx";
import Summary from "./Summary.tsx";
import { useState } from "react";
import type { UserSelections } from "./types/configurator.ts";

export default function App() {
  const [UserSelection, setUserSelection] = useState<UserSelections>({
    vehicle: { year: "", make: "", model: "" },
    coverage_first: "",
    coverage_second: "",
    upgrades: [],
  });

  function handleUserSelection(selection: UserSelections) {
    setUserSelection(selection);
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <VehicleSelector
              UserSelection={UserSelection}
              onSelectionChange={handleUserSelection}
            />
          }
        />
        <Route
          path="/seat-coverage"
          element={
            <SeatCoverage
              UserSelection={UserSelection}
              onSelectionChange={handleUserSelection}
            />
          }
        />
        <Route
          path="/optional-upgrades"
          element={
            <OptionalUpgrade
              UserSelection={UserSelection}
              onSelectionChange={handleUserSelection}
            />
          }
        />
        <Route
          path="/summary"
          element={<Summary UserSelection={UserSelection} />}
        />
      </Routes>
    </Router>
  );
}
