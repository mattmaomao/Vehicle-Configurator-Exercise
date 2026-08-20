import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function VehicleSelector() {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Selected Vehicle:", { year, make, model });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-900 text-white center w-4/5 m-auto ">
        <header>Select a vehicle</header>
        <form className="flex items-center" action="" onSubmit={handleSubmit}>
          <div className="w-full">
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

          <div className="w-full">
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

          <div className="w-full">
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
          <button className="py-2 px-4 bg-red-500 disabled:opacity-50" disabled={model === ""}>
            Select
          </button>
        </form>
      </div>
    </div>
  );
}
