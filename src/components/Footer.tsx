import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link className="logo" href="/" style={{ fontSize: "1.05rem" }}>
            <img src="/img/logo.svg" alt="" width={20} height={20} />
            Maestro IDE
          </Link>
          <p style={{ marginTop: 10, maxWidth: 340 }}>
            A cross-platform AI studio for orchestrating multi-agent systems. Built in Rust.
            Self-hosted. Zero telemetry by default.
          </p>
          <p style={{ marginTop: 14, fontSize: "0.78rem" }}>
            Interface previews on this site are rendered from the Maestro design specification
            (MSTRO-SPEC-001).
          </p>
        </div>
        <div className="cols">
          <div className="col">
            <span className="h">Product</span>
            <Link href="/features">Features</Link>
            <Link href="/#roadmap">Roadmap</Link>
            <Link href="/faq">FAQ</Link>
          </div>
          <div className="col">
            <span className="h">Learn</span>
            <Link href="/how-to/getting-started">Getting started</Link>
            <Link href="/how-to">All guides</Link>
            <a href="https://arxiv.org/abs/2508.11616">MRGD paper</a>
          </div>
          <div className="col">
            <span className="h">Project</span>
            <a href="https://github.com/mosesmarimo/maestro-website">Website source</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
