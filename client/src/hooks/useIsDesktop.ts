import { useEffect, useState } from "react";

export function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`);
    const handler = () => setIsDesktop(mql.matches);
    handler();
    mql.addEventListener?.("change", handler);
    return () => mql.removeEventListener?.("change", handler);
  }, [minWidth]);
  return isDesktop;
}
