import React from "react";
import { cn } from "../../lib/cn";

export const Separator: React.FC<{
  orientation?: "horizontal" | "vertical";
  className?: string;
}> = ({ orientation = "horizontal", className }) => (
  <div
    role="separator"
    className={cn(
      "bg-(--border)",
      orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
      className
    )}
  />
);
