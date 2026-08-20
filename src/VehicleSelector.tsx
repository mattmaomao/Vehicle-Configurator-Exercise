import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserSelections } from "./types/configurator.ts";
import { KeyboardLegend } from "./components/KeyboardLegend.tsx";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VehicleSelector({
  UserSelection,
  onSelectionChange,
}: {
  UserSelection: UserSelections;
  onSelectionChange: (selection: UserSelections) => void;
}) {
  const nav = useNavigate();
  const [year, setYear] = useState(UserSelection.vehicle.year);
  const [make, setMake] = useState(UserSelection.vehicle.make);
  const [model, setModel] = useState(UserSelection.vehicle.model);

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    onSelectionChange({
      ...UserSelection,
      vehicle: { year, make, model },
    });

    nav("/seat-coverage");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="center w-4/5 m-auto p-2">
        <div className="flex justify-between items-center mb-2">
          <header className="text-lg font-semibold mb-2">Select a vehicle</header>
          <KeyboardLegend />
        </div>
        <form className="flex" action="" onSubmit={handleSubmit}>
          <div className="h-full w-full text-black bg-gray-100 rounded-md">
            <Select
              onValueChange={(e) => {
                setYear(e);
                setMake("");
                setModel("");
              }}
              value={year}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Year</SelectItem>
                  <SelectItem value="1">2026</SelectItem>
                  <SelectItem value="2">2025</SelectItem>
                  <SelectItem value="3">2024</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="h-full w-full text-black bg-gray-100 rounded-md">
            <Select
              disabled={year === ""}
              onValueChange={(e) => {
                setMake(e);
                setModel("");
              }}
              value={make}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Make</SelectItem>
                  <SelectLabel>Top Make</SelectLabel>
                  <SelectItem value="1">Make 1</SelectItem>
                  <SelectItem value="2">Make 2</SelectItem>
                  <SelectItem value="3">Make 3</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="4">Make 4</SelectItem>
                  <SelectItem value="5">Make 5</SelectItem>
                  <SelectItem value="6">Make 6</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="h-full w-full text-black bg-gray-100 rounded-md">
            <Select
              disabled={make === ""}
              onValueChange={(e) => setModel(e)}
              value={model}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">Model</SelectItem>
                  <SelectItem value="1">Model 1</SelectItem>
                  <SelectItem value="2">Model 2</SelectItem>
                  <SelectItem value="3">Model 3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <button
            className="px-4 bg-red-500 text-white disabled:opacity-50"
            disabled={model === ""}
          >
            Select
          </button>
        </form>
      </div>
    </div>
  );
}
