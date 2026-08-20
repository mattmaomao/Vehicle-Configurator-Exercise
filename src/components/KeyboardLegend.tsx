import { Keyboard } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const SHORTCUTS: { keys: string; action: string }[] = [
  { keys: "Tab / Shift+Tab", action: "Move between fields and buttons" },
  { keys: "Arrow keys", action: "Change the selected option within a group" },
  { keys: "Space / Enter", action: "Select an option or activate a button" },
  { keys: "Esc", action: "Close an open menu" },
]

export function KeyboardLegend() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-sm border border-line px-3 py-1.5 text-xs font-medium text-steel hover:text-ink hover:border-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1"
        >
          <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
          Keyboard use
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="mb-2 font-display text-xs font-semibold uppercase tracking-wide text-steel">
          Keyboard use
        </p>
        <dl className="grid gap-2">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="grid grid-cols-[auto_1fr] gap-3">
              <dt>
                <kbd className="rounded-sm border border-line bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink">
                  {s.keys}
                </kbd>
              </dt>
              <dd className="text-steel">{s.action}</dd>
            </div>
          ))}
        </dl>
      </PopoverContent>
    </Popover>
  )
}
