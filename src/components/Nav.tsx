"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/how-to", label: "How-to" },
  { href: "/faq", label: "FAQ" },
  { href: "/#roadmap", label: "Roadmap" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="logo" href="/">
          <img src="/img/logo.svg" alt="" width={26} height={26} />
          Maestro IDE
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={
                l.href !== "/#roadmap" && pathname.startsWith(l.href) ? "active" : undefined
              }
            >
              {l.label}
            </Link>
          ))}
          <a className="btn-gh" href="https://github.com/mosesmarimo/maestro-website">
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
