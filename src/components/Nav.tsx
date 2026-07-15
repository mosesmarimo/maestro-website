"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/docs", label: "Docs" },
  { href: "/how-to", label: "How-to" },
  { href: "/faq", label: "FAQ" },
  { href: "/support", label: "Support" },
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
          <Link className="btn-gh" href="/download">
            Download
          </Link>
        </div>
      </div>
    </nav>
  );
}
