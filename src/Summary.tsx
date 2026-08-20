import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { UserSelections } from "./types/configurator.ts";
import { BottomNavBar } from "@/components/ui/bottomNavBar.tsx";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Summary({
  UserSelection,
  onSelectionChange,
}: {
  UserSelection: UserSelections;
  onSelectionChange: (selection: UserSelections) => void;
}) {
  const nav = useNavigate();

  const UPGRADES = ["upgrade-1", "upgrade-2"] as const;
  type UpgradeValue = (typeof UPGRADES)[number];

  const UPGRADE_LABELS: Record<UpgradeValue, string> = {
    "upgrade-1": "Upgrade 1",
    "upgrade-2": "Upgrade 2",
  };

  const [selectedUpgrade, setSelectedUpgrade] = useState<UpgradeValue | null>(
    UPGRADE_LABELS[UserSelection.upgrades[0] as UpgradeValue]
      ? (UserSelection.upgrades[0] as UpgradeValue)
      : null,
  );

  function handleSubmit() {
    onSelectionChange({
      ...UserSelection,
      upgrades: selectedUpgrade ? [selectedUpgrade] : [],
    });
  }

  function handleBack() {
    // navigate to previous step
    nav("/seat-coverage");
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="center w-4/5 m-auto p-2">
        <header className="text-lg font-semibold mb-2">
          Optional Upgrades
        </header>
        <div className="flex flex-col justify-center items-center gap-3 w-full">
          <div className="w-full">
            <Collapsible className="flex flex-col border" defaultOpen>
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
                    >
                      <span>{UPGRADE_LABELS[upgrade]}</span>
                    </div>
                  );
                })}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <BottomNavBar
          onBack={handleBack}
          onContinue={() => {
            handleSubmit();
          }}
        />
      </div>
    </div>
  );
}
