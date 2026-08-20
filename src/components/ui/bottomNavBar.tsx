interface NavigationBarProps {
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
}

export function BottomNavBar({
  onBack,
  onContinue,
  continueLabel = "CONTINUE",
}: NavigationBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-end border-t border-line bg-panel px-4 py-3 gap-2">
      <button
        className="py-2 px-4 bg-transparent border border-line border-black hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onBack}
      >
        BACK
      </button>

      <button
        className="py-2 px-4 bg-red-500 text-white hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onContinue}
      >
        {continueLabel}
      </button>
    </div>
  );
}
