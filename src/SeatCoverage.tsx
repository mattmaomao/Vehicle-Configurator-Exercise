import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { UserSelections } from "./types/configurator.ts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function SeatCoverage({
  UserSelection,
  onSelectionChange,
}: {
  UserSelection: UserSelections;
  onSelectionChange: (selection: UserSelections) => void;
}) {
  const nav = useNavigate();

  const SEATS = ["seat-1", "seat-2", "other"] as const;
  type SeatValue = (typeof SEATS)[number];

  const SEAT_LABELS: Record<SeatValue, string> = {
    "seat-1": "Seat 1",
    "seat-2": "Seat 2",
    other: "Don't See Your Seats?",
  };

  const [selectedSeat1, setSelectedSeat1] = useState<SeatValue | null>(
    SEAT_LABELS[UserSelection.coverage_first as SeatValue]
      ? (UserSelection.coverage_first as SeatValue)
      : null,
  );
  const [selectedSeat2, setSelectedSeat2] = useState<SeatValue | null>(
    SEAT_LABELS[UserSelection.coverage_second as SeatValue]
      ? (UserSelection.coverage_second as SeatValue)
      : null,
  );
  const [validSelection, setValidSelection] = useState(true);

  function handleSubmit() {
    if (!selectedSeat1 && !selectedSeat2) {
      setValidSelection(false);
      return;
    }
    setValidSelection(true);

    onSelectionChange({
      ...UserSelection,
      coverage_first: selectedSeat1 || "",
      coverage_second: selectedSeat2 || "",
    });

    nav("/optional-upgrades");
  }

  function handleBack() {
    // navigate to previous step
    nav("/");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-4/5 m-auto gap-3">
      <header>Select Your Seat Type</header>
      <div
        className={cn(
          "flex flex-col justify-center items-center gap-3 w-full",
          validSelection ? "" : "ring-2 ring-red-400",
        )}
      >
        <div className="w-full">
          <Collapsible className="flex flex-col border">
            <div className="flex items-center justify-between gap-4 px-4">
              <div className="text-sm font-semibold">First Row</div>
              {/* selection preview */}
              <span className="text-sm text-end grow-1" id="first-row-label">
                {selectedSeat1
                  ? SEAT_LABELS[selectedSeat1]
                  : "Select a seat type"}
              </span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDownIcon />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent
              className="flex flex-col gap-2 mx-4 my-2"
              role="radiogroup"
              aria-label="Seats"
            >
              {SEATS.map((seat) => {
                const isSelected = selectedSeat1 === seat;
                return (
                  <div
                    key={seat}
                    className={cn(
                      "flex justify-between items-center border px-4 py-2 hover:ring-2 hover:ring-red-200 hover:cursor-pointer",
                      isSelected && "ring-2 ring-green-400",
                    )}
                    onClick={() => {
                      if (isSelected) setSelectedSeat1(null);
                      else {
                        setSelectedSeat1(seat);
                        setValidSelection(true);
                      }
                    }}
                  >
                    <span>{SEAT_LABELS[seat]}</span>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={cn(
                        "py-1 px-2 hover:bg-red-200",
                        isSelected ? "bg-green-500 text-white" : "bg-gray-100",
                      )}
                    >
                      {isSelected ? "SELECTED" : "SELECT"}
                    </button>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="w-full">
          <Collapsible className="flex flex-col border">
            <div className="flex items-center justify-between gap-4 px-4">
              <div className="text-sm font-semibold">Second Row</div>
              {/* selection preview */}
              <span className="text-sm text-end grow-1" id="second-row-label">
                {selectedSeat2
                  ? SEAT_LABELS[selectedSeat2]
                  : "Select a seat type"}
              </span>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <ChevronsUpDownIcon />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent
              className="flex flex-col gap-2 mx-4 my-2"
              role="radiogroup"
              aria-label="Seats"
            >
              {SEATS.map((seat) => {
                const isSelected = selectedSeat2 === seat;
                return (
                  <div
                    key={seat}
                    className={cn(
                      "flex justify-between items-center border px-4 py-2 hover:ring-2 hover:ring-red-200 hover:cursor-pointer",
                      isSelected && "ring-2 ring-green-400",
                    )}
                    onClick={() => {
                      if (isSelected) setSelectedSeat2(null);
                      else {
                        setSelectedSeat2(seat);
                        setValidSelection(true);
                      }
                    }}
                  >
                    <span>{SEAT_LABELS[seat]}</span>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={cn(
                        "py-1 px-2 hover:bg-red-200",
                        isSelected ? "bg-green-500 text-white" : "bg-gray-100",
                      )}
                    >
                      {isSelected ? "SELECTED" : "SELECT"}
                    </button>
                  </div>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-end border-t border-line bg-panel px-4 py-3 gap-2">
        <button
          className="py-2 px-4 bg-transparent border border-line border-black hover:cursor-pointer"
          onClick={handleBack}
        >
          BACK
        </button>

        <button
          className="py-2 px-4 bg-red-500 text-white hover:cursor-pointer"
          onClick={() => handleSubmit()}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
