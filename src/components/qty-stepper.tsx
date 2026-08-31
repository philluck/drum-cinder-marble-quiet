import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function QtyStepper({
  value,
  onChange,
  className,
}: {
  value: number;
  onChange: (next: number) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-11 items-center rounded-md bg-elevated shadow-[0_0_0_1px_rgba(243,239,232,0.1)]",
        className,
      )}
    >
      <button
        type="button"
        className="grid size-11 place-items-center text-muted transition-colors duration-150 hover:text-fg"
        onClick={() => onChange(value - 1)}
        aria-label="Уменьшить"
      >
        <Minus className="size-4" />
      </button>
      <span className="min-w-6 text-center text-sm tabular-nums">{value}</span>
      <button
        type="button"
        className="grid size-11 place-items-center text-muted transition-colors duration-150 hover:text-fg"
        onClick={() => onChange(value + 1)}
        aria-label="Увеличить"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}
