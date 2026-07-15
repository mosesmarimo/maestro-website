import { ImageResponse } from "next/og";

export const alt = "Maestro Studio — AI Agent Orchestration Platform & Agent Harness";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Branded Open Graph card: Polished Pine navy field, jade routed-M mark.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #03111E 0%, #0B1F2E 100%)",
          color: "#E8F0F6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="88" height="88" viewBox="0 0 512 512" fill="none">
            <rect width="512" height="512" rx="112" fill="#03111E" />
            <rect x="18" y="18" width="476" height="476" rx="96" stroke="#244356" strokeWidth="4" />
            <path
              d="M132 346V198L256 306L380 198V346"
              stroke="#3EAF86"
              strokeWidth="48"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="132" cy="198" r="14" fill="#93CDB3" />
            <circle cx="256" cy="306" r="14" fill="#93CDB3" />
            <circle cx="380" cy="198" r="14" fill="#93CDB3" />
          </svg>
          <div style={{ fontSize: 56, fontWeight: 700 }}>Maestro Studio</div>
        </div>
        <div style={{ fontSize: 42, fontWeight: 700, marginTop: 48, lineHeight: 1.2, maxWidth: 980 }}>
          The AI agent orchestration studio
        </div>
        <div style={{ fontSize: 26, color: "#93A9B8", marginTop: 22, lineHeight: 1.45, maxWidth: 960 }}>
          Visual multi-agent workflows · model routing matrix · live agent map · multimodal
          reward-guided decoding (MRGD)
        </div>
        <div style={{ fontSize: 22, color: "#3EAF86", marginTop: 40 }}>maestroide.com</div>
      </div>
    ),
    { ...size },
  );
}
