import React from "react";
import { cn } from "../../lib/cn";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-sm placeholder:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          "bg-(--panel) border-(--border) text-(--text)",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
