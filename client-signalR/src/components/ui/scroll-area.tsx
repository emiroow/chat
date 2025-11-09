import React from "react";
import { cn } from "../../lib/cn";

type ScrollAreaProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "visible" | "hidden"; // whether to show the scrollbar UI
};

export const ScrollArea: React.FC<ScrollAreaProps> = ({
  className,
  children,
  variant = "visible",
  ...props
}) => {
  const visible =
    "[scrollbar-width:thin] [scrollbar-color:var(--scrollbar-thumb)_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--scrollbar-thumb)]";
  const hidden =
    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0";
  return (
    <div
      className={cn(
        "overflow-y-auto",
        variant === "visible" ? visible : hidden,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
