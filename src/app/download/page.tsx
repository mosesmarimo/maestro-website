import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Download Maestro Studio",
  description:
    "Download Maestro Studio preview builds for Windows, macOS (Apple Silicon and Intel), and Linux. Free preview of the AI agent orchestration studio.",
  alternates: { canonical: "/download" },
  keywords: ["download Maestro Studio", "AI agent IDE download", "agent orchestration desktop app", "Tauri AI IDE"],
};

const VERSION = "1.6.0";
const BASE = `https://github.com/mosesmarimo/maestro-releases/releases/download/v${VERSION}`;

const DOWNLOADS: {
  platform: string;
  arch: string;
  file: string;
  kind: string;
  note: string;
  alt?: { file: string; kind: string };
  comingSoon?: boolean;
}[] = [
  {
    platform: "macOS",
    arch: "Universal · Apple Silicon + Intel · macOS 12+",
    file: `Maestro-Studio_${VERSION}_universal.dmg`,
    kind: "Disk image (.dmg)",
    note: "Unsigned preview — macOS blocks it on first open. Open System Settings → Privacy & Security → Open Anyway, or run: xattr -dr com.apple.quarantine '/Applications/Maestro Studio.app'",
  },
  {
    platform: "Windows",
    arch: "x64 · Windows 10+",
    file: `Maestro-Studio_${VERSION}_x64-setup.exe`,
    kind: "Installer (.exe)",
    alt: { file: `Maestro-Studio_${VERSION}_x64.msi`, kind: ".msi" },
    note: "Unsigned preview — SmartScreen will ask you to confirm: More info → Run anyway.",
  },
  {
    platform: "Linux",
    arch: "x64 · Ubuntu 22.04+, Fedora 39+",
    file: `Maestro-Studio_${VERSION}_amd64.AppImage`,
    kind: "AppImage",
    alt: { file: `Maestro-Studio_${VERSION}_amd64.deb`, kind: ".deb" },
    note: "Make the AppImage executable (chmod +x) and run it, or install the .deb with apt.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Maestro Studio",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows, macOS, Linux",
  softwareVersion: VERSION,
  downloadUrl: "https://maestroide.com/download",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: "Free preview build" },
  url: "https://maestroide.com",
};

export default function DownloadPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Release channel: Alpha · v{VERSION}</p>
          <h1>Download Maestro Studio</h1>
          <p className="lede">
            Maestro moves through three release channels. Today&rsquo;s builds are{" "}
            <strong style={{ color: "var(--ivory)" }}>Alpha</strong>: the whole blueprint is
            implemented — the orchestration IDE, real media generation, persistent memory, skills,
            the messaging gateway, sandboxed backends, browser automation with vision, rooms, the web
            console, and trajectory export. Builds are unsigned and rough in places; signing and
            hardening come with Beta per the <Link href="/#roadmap">roadmap</Link>. Free while in preview.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <div className="channels">
            <div className="channel now">
              <div className="ch-tag">Alpha — you are here</div>
              <h3>The full studio, unsigned</h3>
              <p>Every capability in the blueprint ships in these preview builds — unsigned, with rough edges and fast changes. Project files stay forward-compatible.</p>
            </div>
            <div className="channel">
              <div className="ch-tag">Beta</div>
              <h3>Signed &amp; auto-updating</h3>
              <p>Code-signed, notarized installers with in-app auto-updates and a stabilization focus — no more Gatekeeper prompts.</p>
            </div>
            <div className="channel">
              <div className="ch-tag">Stable</div>
              <h3>Production GA</h3>
              <p>Production-ready: code-signed and notarized on every platform, with the full acceptance suite green behind each release.</p>
            </div>
          </div>

          <div className="section-head" style={{ margin: "48px 0 24px", maxWidth: "none" }}>
            <h2 style={{ fontSize: "1.6rem" }}>Alpha downloads · v{VERSION}</h2>
          </div>
          <div className="guide-cards">
            {DOWNLOADS.map((d) => (
              <div className="guide-card" key={d.file} style={{ display: "flex", flexDirection: "column" }}>
                <span className="k">{d.platform} · {d.arch}</span>
                <h3 style={{ marginBottom: 10 }}>{d.platform === "macOS" ? `macOS — ${d.arch.split(" ·")[0]}` : d.platform}</h3>
                <div className="hero-cta" style={{ marginTop: "auto", gap: 10 }}>
                  {d.comingSoon ? (
                    <span className="btn btn-ghost btn-soon" aria-disabled="true">
                      Coming soon
                    </span>
                  ) : (
                    <>
                      <a className="btn btn-primary" href={`${BASE}/${d.file}`} style={{ padding: "10px 16px", fontSize: "0.92rem" }}>
                        Download {d.kind}
                      </a>
                      {d.alt && (
                        <a className="btn btn-ghost" href={`${BASE}/${d.alt.file}`} style={{ padding: "10px 16px", fontSize: "0.92rem" }}>
                          {d.alt.kind}
                        </a>
                      )}
                    </>
                  )}
                </div>
                <p style={{ color: "var(--faint)", fontSize: "0.82rem", marginTop: 12 }}>{d.note}</p>
              </div>
            ))}
          </div>

          <div className="callout" style={{ marginTop: 36, maxWidth: 820 }}>
            <strong>Alpha builds are unsigned.</strong> Code signing and notarization arrive with
            the Beta and Stable channels; until then your OS will warn on first launch — the notes
            on each card show the standard way through. SHA-256 checksums are published with{" "}
            <a href="https://github.com/mosesmarimo/maestro-releases/releases">each release</a>.
          </div>

          <div className="hero-cta" style={{ marginTop: 30 }}>
            <Link className="btn btn-ghost" href="/how-to/getting-started">First steps after installing</Link>
            <Link className="btn btn-ghost" href="/support">Something not working? Contact support</Link>
          </div>
        </div>
      </section>
    </>
  );
}
