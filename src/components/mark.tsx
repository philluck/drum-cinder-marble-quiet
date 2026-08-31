import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-fg", className)}
      aria-hidden="true"
    >
      <rect x="3" y="20" width="26" height="7" rx="1.2" fill="currentColor" opacity="0.28" />
      <path
        d="M5 21.5 L23 7.5 L26.2 9.2 L8.4 23.2 Z"
        fill="currentColor"
      />
      <path
        d="M23 7.5 L26.2 9.2 L25.1 6.2 Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}
