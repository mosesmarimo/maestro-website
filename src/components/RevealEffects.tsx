"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Adds the .in class to .reveal elements as they scroll into view.
// Re-runs on route change; prefers-reduced-motion is handled in CSS.
export default function RevealEffects() {
  const pathname = usePathname();
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
