import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React from "react";
import { cn } from "../../lib/cn";

type ToastType = "info" | "success" | "error";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
};

let idSeq = 1;
let toasts: ToastItem[] = [];
const listeners = new Set<(items: ToastItem[]) => void>();

function emit() {
  for (const l of listeners) l(toasts);
}

function add(message: string, type: ToastType = "info", duration = 3000) {
  const item: ToastItem = { id: idSeq++, message, type, duration };
  toasts = [...toasts, item];
  emit();
  window.setTimeout(() => remove(item.id), duration);
  return item.id;
}

function remove(id: number) {
  const next = toasts.filter((t) => t.id !== id);
  if (next.length !== toasts.length) {
    toasts = next;
    emit();
  }
}

export const toast = {
  info: (msg: string, duration?: number) => add(msg, "info", duration),
  success: (msg: string, duration?: number) => add(msg, "success", duration),
  error: (msg: string, duration?: number) => add(msg, "error", duration),
  dismiss: (id: number) => remove(id),
};

// muted colored halo per type (only the glow, UI stays black/white)
const haloColors: Record<ToastType, string> = {
  info: "bg-sky-500/10",
  success: "bg-emerald-500/10",
  error: "bg-rose-500/10",
};

export const Toaster: React.FC = () => {
  const [items, setItems] = React.useState<ToastItem[]>(toasts);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const listener = (next: ToastItem[]) => setItems(next);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  // show only the last 3 for a cleaner stack
  const visible = items.slice(-3);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-2 bottom-[calc(env(safe-area-inset-bottom)+12px)] z-50",
        "flex w-auto max-w-[92vw] flex-col items-center gap-2",
        "sm:inset-auto sm:top-5 sm:right-5 sm:bottom-auto sm:items-end sm:max-w-sm"
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {visible.map((t) => {
          const halo = haloColors[t.type];
          const durationSec = Math.max(0.01, t.duration / 1000);

          return (
            <motion.div
              key={t.id}
              layout
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              animate={
                reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -10, scale: 0.98 }
              }
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 0.8,
              }}
              drag="x"
              dragElastic={0.12}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 60) toast.dismiss(t.id);
              }}
              className={cn(
                "group relative pointer-events-auto rounded-xl shadow-md backdrop-blur-sm",
                // monochrome surface, no border/ring
                "supports-[backdrop-filter]:bg-white/70 bg-white/80",
                "dark:bg-neutral-900/80"
              )}
              role="status"
              aria-live="polite"
            >
              {/* colored halo (muted) */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -inset-3 -z-10 blur-2xl saturate-100",
                  halo
                )}
              />
              <div className="flex items-center gap-2.5 px-3 py-2 pl-3.5">
                <span className="flex h-5 w-5 items-center justify-center text-neutral-900 dark:text-neutral-100">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {t.type === "success" && <path d="M20 6 9 17l-5-5" />}
                    {t.type === "error" && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M15 9 9 15M9 9l6 6" />
                      </>
                    )}
                    {t.type === "info" && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8h.01M11 12h2v4h-2z" />
                      </>
                    )}
                  </svg>
                </span>

                <p className="flex-1 select-none text-[13px] leading-5 font-medium text-neutral-900 dark:text-neutral-100 break-words">
                  {t.message}
                </p>

                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="ml-1 shrink-0 rounded-md p-1 text-neutral-700 opacity-60 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-black/10 dark:text-neutral-200 dark:focus:ring-white/20"
                  aria-label="Dismiss"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <motion.span
                className={cn(
                  "absolute bottom-0 left-0 mx-2 h-px w-full origin-left",
                  "bg-neutral-800 dark:bg-neutral-300"
                )}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: durationSec, ease: "linear" }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

Toaster.displayName = "Toaster";
