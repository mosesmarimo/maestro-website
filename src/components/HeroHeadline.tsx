"use client";

import { useEffect, useState } from "react";

type Part = { t: string; tint?: boolean };

// The first headline is server-rendered (stable for SEO); the rest rotate in.
const HEADLINES: Part[][] = [
  [{ t: "Stop guessing what your agents are doing. " }, { t: "Conduct", tint: true }, { t: " them." }],
  [{ t: "Maestro. Because talent isn't enough. " }, { t: "Orchestrate, not improvise.", tint: true }],
  [{ t: "Agents need no manager. They need a " }, { t: "maestro", tint: true }, { t: " for symphony." }],
  [{ t: "Many agents. " }, { t: "One score.", tint: true }, { t: " Drowning noise with symphony!" }],
];

const ROTATE_MS = 6000;
const FADE_MS = 450;

export default function HeroHeadline() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % HEADLINES.length);
        setFading(false);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className={`hero-headline${fading ? " fading" : ""}`} aria-live="off">
      {HEADLINES[index].map((p, i) =>
        p.tint ? (
          <span key={i} className="tint">
            {p.t}
          </span>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </h1>
  );
}
