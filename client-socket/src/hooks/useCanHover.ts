import { useEffect, useState } from "react";

export function useCanHover() {
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      setCanHover(false);
      return;
    }
    const mql = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(mql.matches);
    update();
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }
    // Legacy Safari
    // @ts-ignore
    mql.addListener(update);
    // @ts-ignore
    return () => mql.removeListener(update);
  }, []);
  return canHover;
}
