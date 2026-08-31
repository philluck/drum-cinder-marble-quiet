import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-elevated px-3 text-base text-fg shadow-[0_0_0_1px_rgba(243,239,232,0.1)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[0_0_0_1px_rgba(197,205,214,0.7)] md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
