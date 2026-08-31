import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-elevated px-2.5 py-1 text-xs font-medium text-muted shadow-[0_0_0_1px_rgba(243,239,232,0.08)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
