// The "live score" hero visual: an animated workflow graph on staff lines.
// Animations are pure CSS (see globals.css) and honor prefers-reduced-motion.
export default function ScorePanel() {
  return (
    <div
      className="score-panel"
      role="img"
      aria-label="Animated preview of a Maestro run: agents moving through workflow nodes"
    >
      <div className="score-head">
        <span className="win">
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span>research-review.workflow — run #128</span>
        <span className="legend">
          <span>
            <i className="i-violet"></i>thinking
          </span>
          <span>
            <i className="i-cyan"></i>calling model
          </span>
          <span>
            <i className="i-amber"></i>waiting
          </span>
          <span>
            <i className="i-green"></i>done
          </span>
        </span>
      </div>
      <svg
        className="score-svg"
        viewBox="0 0 960 330"
        xmlns="http://www.w3.org/2000/svg"
        fontFamily="var(--mono)"
      >
        <g stroke="#16303F" strokeWidth="1">
          <line x1="0" y1="110" x2="960" y2="110" />
          <line x1="0" y1="145" x2="960" y2="145" />
          <line x1="0" y1="180" x2="960" y2="180" />
          <line x1="0" y1="215" x2="960" y2="215" />
          <line x1="0" y1="250" x2="960" y2="250" />
        </g>

        <path className="edge-flow" d="M186 172 C 250 172, 260 128, 314 128" stroke="#33566B" strokeWidth="2" fill="none" />
        <path className="edge-flow" d="M186 172 C 250 172, 260 216, 314 216" stroke="#33566B" strokeWidth="2" fill="none" />
        <path className="edge-flow" d="M426 128 C 500 128, 500 172, 554 172" stroke="#3EAF86" strokeWidth="2.2" fill="none" />
        <path className="edge-flow" d="M426 216 C 500 216, 500 178, 554 178" stroke="#33566B" strokeWidth="2" fill="none" />
        <path className="edge-flow" d="M662 172 C 730 172, 740 172, 794 172" stroke="#33566B" strokeWidth="2" fill="none" />
        <path className="edge-flow" d="M426 226 C 460 240, 460 244, 322 244" stroke="#f2b75c" strokeWidth="1.6" fill="none" opacity="0.7" />

        <g>
          <rect x="86" y="146" width="100" height="52" rx="10" fill="#0B1F2E" stroke="#1B3242" strokeWidth="1.5" />
          <text x="136" y="168" textAnchor="middle" fill="#5E7A8C" fontSize="9" letterSpacing="1.5">INPUT</text>
          <text x="136" y="186" textAnchor="middle" fill="#E8F0F6" fontSize="12" fontFamily="var(--body)">brief</text>

          <rect className="node-pulse" x="314" y="100" width="112" height="54" rx="10" fill="#0B1F2E" stroke="#4fc3e8" strokeWidth="2" />
          <text x="370" y="122" textAnchor="middle" fill="#5E7A8C" fontSize="9" letterSpacing="1.5">AGENT</text>
          <text x="370" y="140" textAnchor="middle" fill="#E8F0F6" fontSize="12" fontFamily="var(--body)">researcher</text>

          <rect className="node-pulse" x="314" y="190" width="112" height="54" rx="10" fill="#0B1F2E" stroke="#8b7cf7" strokeWidth="2" />
          <text x="370" y="212" textAnchor="middle" fill="#5E7A8C" fontSize="9" letterSpacing="1.5">AGENT</text>
          <text x="370" y="230" textAnchor="middle" fill="#E8F0F6" fontSize="12" fontFamily="var(--body)">writer</text>

          <rect x="252" y="228" width="70" height="32" rx="8" fill="#0B1F2E" stroke="#1B3242" />
          <text x="287" y="248" textAnchor="middle" fill="#f2b75c" fontSize="10">tool</text>

          <rect className="node-pulse" x="554" y="144" width="108" height="56" rx="10" fill="#0A2921" stroke="#3EAF86" strokeWidth="2" />
          <text x="608" y="166" textAnchor="middle" fill="#3EAF86" fontSize="9" letterSpacing="1.5">MRGD</text>
          <text x="608" y="184" textAnchor="middle" fill="#E8F0F6" fontSize="12" fontFamily="var(--body)">k=5 · w=0.75</text>

          <rect x="794" y="146" width="100" height="52" rx="10" fill="#0B1F2E" stroke="#1B3242" strokeWidth="1.5" />
          <text x="844" y="168" textAnchor="middle" fill="#5E7A8C" fontSize="9" letterSpacing="1.5">OUTPUT</text>
          <text x="844" y="186" textAnchor="middle" fill="#E8F0F6" fontSize="12" fontFamily="var(--body)">caption</text>
        </g>

        <g className="chip-a">
          <circle cx="160" cy="146" r="11" fill="#4fc3e8" />
          <text x="160" y="150" textAnchor="middle" fill="#03111E" fontSize="10" fontWeight="700">R</text>
        </g>
        <g className="chip-b">
          <circle cx="150" cy="196" r="11" fill="#8b7cf7" />
          <text x="150" y="200" textAnchor="middle" fill="#03111E" fontSize="10" fontWeight="700">W</text>
        </g>
        <g className="chip-c">
          <circle cx="150" cy="278" r="11" fill="#f2b75c" />
          <text x="150" y="282" textAnchor="middle" fill="#03111E" fontSize="10" fontWeight="700">C</text>
        </g>

        <text x="24" y="308" fill="#5E7A8C" fontSize="10.5">
          12:04:14 mrgd · round 3 · candidate 2 selected · s=0.87 (r_hal 0.91 · r_rec 0.74)
        </text>
      </svg>
    </div>
  );
}
