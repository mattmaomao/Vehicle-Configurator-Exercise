import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OptionalUpgrade() {
  const UPGRADES = ["upgrade-1", "upgrade-2"] as const;
  type UpgradeValue = (typeof UPGRADES)[number];

  const UPGRADE_LABELS: Record<UpgradeValue, string> = {
    "upgrade-1": "Upgrade 1",
    "upgrade-2": "Upgrade 2",
  };

  const [selectedUpgrade, setSelectedUpgrade] = useState<UpgradeValue | null>(
    null,
  );

  function handleSubmit() {
    console.log("Selected Upgrade:", {
      seat1: selectedUpgrade,
    });
  }

  function handleBack() {
    console.log("Back button clicked");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen w-4/5 m-auto gap-3">
      <header>Select Optional Upgrades</header>
      <div className="flex flex-col justify-center items-center gap-3 w-full">
        <div className="w-full">
          <Collapsible className="flex flex-col border">
            <div className="flex items-center justify-between gap-4 px-4">
              <div className="text-sm font-semibold">First Row</div>
              {/* selection preview */}
              <span className="text-sm text-end grow-1" id="first-row-label">
                {selectedUpgrade
                  ? UPGRADE_LABELS[selectedUpgrade]
                  : "Select an upgrade"}
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
              aria-label="Upgrades"
            >
              {UPGRADES.map((upgrade) => {
                const isSelected = selectedUpgrade === upgrade;
                return (
                  <div
                    key={upgrade}
                    className={cn(
                      "flex justify-between items-center border px-4 py-2 hover:ring-2 hover:ring-red-200 hover:cursor-pointer",
                      isSelected && "ring-2 ring-green-400",
                    )}
                    onClick={() => {
                      if (isSelected) setSelectedUpgrade(null);
                      else {
                        setSelectedUpgrade(upgrade);
                      }
                    }}
                  >
                    <span>{UPGRADE_LABELS[upgrade]}</span>
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
