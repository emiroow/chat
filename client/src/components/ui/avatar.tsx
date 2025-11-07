import React from "react";
import { cn } from "../../lib/cn";

export type AvatarProps = {
  src?: string | null;
  alt?: string;
  fallback?: string; // initials
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  fallback,
  size = "md",
  className,
}) => {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  } as const;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
        sizes[size],
        className
      )}
      aria-label={alt}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : fallback ? (
        <span>{fallback}</span>
      ) : null}
    </div>
  );
};
