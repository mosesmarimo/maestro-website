# maestro-website

Marketing and documentation website for **Maestro IDE** — a cross-platform AI studio for orchestrating multi-agent systems (visual workflow canvas, live agent map, model routing matrix, and MRGD reward-guided decoding).

## Structure

```
index.html            Landing page: animated hero, pillars, MRGD, feature grid, roadmap
features.html         Full feature tour with phase labels (Available / In development)
faq.html              Frequently asked questions
how-to/               Six step-by-step guides + hub page
assets/css/site.css   Design system (palette derived from the product's agent-state legend)
assets/js/site.js     Scroll reveal + nav state (no frameworks)
assets/img/*.svg      Logo and interface previews rendered from the design spec
```

Static site — no build step. All content is guided by the Maestro Product Blueprint (MSTRO-BLU-001 v3.0); feature claims are labeled honestly as available or in development, and interface previews are rendered from the system specification (MSTRO-SPEC-001).

## Develop locally

```bash
python3 -m http.server 4173
# open http://127.0.0.1:4173/
```

## Design notes

- Palette: deep indigo pit `#0b0e1a`, warm ivory text, and the agent-state accent set from the product itself — violet (thinking), cyan (calling model), amber (waiting), green (done).
- Type: Fraunces (display) · Instrument Sans (body) · JetBrains Mono (labels/code), via Google Fonts.
- The hero is a CSS-animated SVG "live score": a workflow graph on musical staff lines with agent chips moving between nodes. Honors `prefers-reduced-motion`.
