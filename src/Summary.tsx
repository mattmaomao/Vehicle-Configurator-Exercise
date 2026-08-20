import { useNavigate } from "react-router-dom";
import type { UserSelections } from "./types/configurator.ts";
import { BottomNavBar } from "@/components/ui/bottomNavBar.tsx";

const SEAT_LABELS: Record<string, string> = {
  "seat-1": "Seat 1",
  "seat-2": "Seat 2",
  other: "Don't See Your Seats?",
};

const UPGRADE_LABELS: Record<string, string> = {
  "upgrade-1": "Upgrade 1",
  "upgrade-2": "Upgrade 2",
};

export default function Summary({
  UserSelection,
}: {
  UserSelection: UserSelections;
}) {
  const nav = useNavigate();

  function handleBack() {
    nav("/optional-upgrades");
  }

  function handleComplete() {
    nav("/");
  }

  const { vehicle, coverage_first, coverage_second, upgrades } = UserSelection;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="center w-4/5 m-auto p-2">
        <header className="text-lg font-semibold mb-2">
          Review Your Selections
        </header>

        <div className="flex flex-col gap-4 w-full">
          <section className="border px-4 py-3">
            <h2 className="text-sm font-semibold mb-2">Vehicle</h2>
            <dl className="grid gap-1 text-sm">
              <SummaryRow label="Year" value={vehicle.year} />
              <SummaryRow label="Make" value={vehicle.make} />
              <SummaryRow label="Model" value={vehicle.model} />
            </dl>
          </section>

          <section className="border px-4 py-3">
            <h2 className="text-sm font-semibold mb-2">Seat Coverage</h2>
            <dl className="grid gap-1 text-sm">
              <SummaryRow
                label="First Row"
                value={
                  coverage_first ? SEAT_LABELS[coverage_first] : "Not selected"
                }
              />
              <SummaryRow
                label="Second Row"
                value={
                  coverage_second
                    ? SEAT_LABELS[coverage_second]
                    : "Not selected"
                }
              />
            </dl>
          </section>

          <section className="border px-4 py-3">
            <h2 className="text-sm font-semibold mb-2">Optional Upgrades</h2>
            {upgrades.length === 0 ? (
              <p className="text-sm text-gray-500">None selected</p>
            ) : (
              <ul className="text-sm list-disc list-inside">
                {upgrades.map((id) => (
                  <li key={id}>{UPGRADE_LABELS[id] ?? id}</li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <BottomNavBar
          onBack={handleBack}
          onContinue={handleComplete}
          continueLabel="COMPLETE"
        />
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-gray-500">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
