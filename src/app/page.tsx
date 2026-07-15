import Link from "next/link";
import ScorePanel from "@/components/ScorePanel";
import NewsletterForm from "@/components/NewsletterForm";
import HeroHeadline from "@/components/HeroHeadline";
import JsonLd from "@/components/JsonLd";

const HOME_JSONLD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Maestro Studio",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Windows, macOS, Linux",
      description:
        "A cross-platform AI agent orchestration studio and agent harness: visual multi-agent workflow canvas, model routing matrix for every modality, live agent map, replayable run logs, and multimodal reward-guided decoding (MRGD).",
      url: "https://maestroide.com",
      softwareHelp: "https://maestroide.com/how-to",
      featureList: [
        "Visual workflow canvas for multi-agent systems",
        "Live agent map and dependency graphs",
        "Unlimited model registry (hosted and local models)",
        "Task routing matrix with fallback chains",
        "Multimodal reward-guided decoding (MRGD)",
        "Replayable run event logs and cost dashboards",
        "Persistent memory and human-approved agent skills (in development)",
        "Messaging gateway, schedules, sandboxed execution backends (in development)",
        "MCP integration (in development)",
      ],
    },
    {
      "@type": "WebSite",
      name: "Maestro Studio",
      url: "https://maestroide.com",
    },
    {
      "@type": "Organization",
      name: "Maestro Studio",
      url: "https://maestroide.com",
      logo: "https://maestroide.com/img/logo.svg",
    },
  ],
};

const FEATURES: { title: string; body: string; dev?: boolean }[] = [
  { title: "Visual workflow canvas", body: "Drag agents, model calls, routers, tools, and control flow onto an infinite canvas. Typed ports reject bad connections and a Problems panel validates before you run." },
  { title: "Live agent map", body: "Running nodes pulse, edges animate in flow direction, and each agent's colored badge sits exactly where it's working — in the canvas and the component tree." },
  { title: "Unlimited model registry", body: "Register any number of models across Anthropic, OpenAI-compatible endpoints, Gemini, Ollama, ElevenLabs, image backends — or any provider via the generic HTTP adapter." },
  { title: "Task routing matrix", body: "Rules map task types to a primary model plus ordered fallbacks, with conditions like context size, cost tier, and local-only tags. A test console explains every decision." },
  { title: "Keychain-only secrets", body: "API keys go into your OS keychain once and never appear in project files, exports, or logs. Zero telemetry by default." },
  { title: "MRGD decoding engine", body: "Reward-guided generation with k candidates, sentence-level scoring, runtime precision/recall weights, presets, and a live candidate inspector.", dev: true },
  { title: "Media generation routing", body: "Image, video, music, TTS, and STT nodes route through the same matrix — plus best-of-k selection over generated media, scored by judges you pick.", dev: true },
  { title: "Run replay & timeline", body: "Every run is an append-only event log: scrub through it step by step, inspect any node's inputs and outputs, and compare two runs side by side on a Gantt timeline.", dev: true },
  { title: "Budgets & approvals", body: "Token, cost, and time budgets pause runs at safe points — never silent overruns. Human-approval nodes gate anything you want to see before it happens.", dev: true },
  { title: "Persistent memory", body: "Agents remember your preferences, projects, and environment across sessions — every entry visible, editable, and stored as plain files you can version.", dev: true },
  { title: "Self-authored skills", body: "After solving a hard problem, an agent drafts a reusable skill in the open SKILL.md format. Drafts wait in a review queue — nothing activates without your approval.", dev: true },
  { title: "Messaging gateway", body: "Talk to your agents from Telegram, Discord, Slack, and more — with pairing-code security, voice memo transcription, and conversations that continue across surfaces.", dev: true },
  { title: "Schedules & headless service", body: "“Every weekday at 8am, summarize my open issues and send it to Telegram.” A background service runs your automations with the IDE closed.", dev: true },
  { title: "Sandboxed execution backends", body: "Agent shell and code tools run where you choose: local, hardened Docker, SSH remotes, or cloud sandboxes — same sandbox policy everywhere.", dev: true },
  { title: "Browser & web tools", body: "Web search, clean page extraction, and full browser automation — navigate, click, type, screenshot — with every action logged and vision analysis in the loop.", dev: true },
  { title: "Multi-agent rooms", body: "Several agents, one conversation. @mention routing, shared context with automatic compression, and one-click conversion of a room into a workflow skeleton.", dev: true },
  { title: "Profiles & web console", body: "Accounts, roles, and isolated profiles on a self-hosted service — plus a browser console for chat, runs, jobs, and dashboards from any machine you allow.", dev: true },
  { title: "Trajectory export (MLOps)", body: "Batch-run workflows over datasets and export tool-call trajectories as ShareGPT or JSONL — curated by outcome, approval, or reward score. Your runs become training data.", dev: true },
  { title: "MCP integration", body: "Attach any Model Context Protocol server and its tools become first-class citizens for agents and canvas nodes, under the same sandbox and approval policies.", dev: true },
];

const STAGES: { tag: string; cls?: string; title: string; body: string }[] = [
  { tag: "Stage A · Complete", cls: "done", title: "Foundations", body: "Cross-platform shell, project system, model registry with keychain secrets, routing matrix with resolver and test console." },
  { tag: "Stages B–D · In progress", cls: "now", title: "Orchestration IDE (Phase 1 GA)", body: "Full canvas authoring, the orchestrator with event-log replay, the live agent map, the MRGD engine and inspector, media adapters, dashboards, and signed installers." },
  { tag: "Stage E", title: "The service split", body: "One headless service, many surfaces: the IDE attaches as a client, a CLI arrives, chat sessions and persistent memory land." },
  { tag: "Stage F", title: "Learning & automation", body: "Skills with the approval queue, natural-language schedules, and the messaging gateway — Telegram, Discord, and Slack first." },
  { tag: "Stage G", title: "Reach & power", body: "Hardened Docker and SSH execution backends, the backend file browser, web search and browser automation, and MCP." },
  { tag: "Stages H–I", title: "Collaboration & the data engine (Phase 2 GA)", body: "Multi-agent rooms, accounts and profiles, the remote web console, voice in and out, and trajectory export for fine-tuning." },
];

export default function HomePage() {
  return (
    <div className="home">
      <JsonLd data={HOME_JSONLD} />
      <header className="hero">
        <div className="wrap">
          <p className="eyebrow">The AI agent orchestration studio</p>
          <HeroHeadline />
          <p className="lede">
            Maestro is a desktop IDE and agent harness for multi-agent AI systems. Compose
            workflows on a canvas, route every kind of task — text, code, images, video, speech —
            to the model you choose, and watch every agent work, live, on a map of your system.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary" href="/features">Explore the features</Link>
            <Link className="btn btn-ghost" href="/how-to/getting-started">Read the guides</Link>
            <Link className="btn btn-ghost" href="/download">Download</Link>
          </div>
          <p className="hero-note">
            <span className="st">●</span> Built in Rust · single core across all three platforms · your keys stay in your OS keychain
          </p>
          <ScorePanel />
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">One studio, three disciplines</p>
            <h2>Compose. Route. Observe.</h2>
            <p className="lede">Most agent tools give you a framework and a log file. Maestro gives you an instrument panel.</p>
          </div>
          <div className="pillars">
            <div className="pillar reveal">
              <span className="state-dot" style={{ background: "var(--cyan)" }}></span>
              <h3>Route every modality</h3>
              <p>One matrix decides which model handles what: text, code, image generation, video, music, TTS, STT, embeddings. Conditions, cost tiers, and ordered fallbacks — assigning &ldquo;image generation → your model&rdquo; is a single dropdown.</p>
              <div className="shot"><img src="/img/shot-routing.svg" alt="Routing matrix editor with task-type rules, primary models and fallback chains" loading="lazy" /></div>
            </div>
            <div className="pillar reveal">
              <span className="state-dot" style={{ background: "var(--violet)" }}></span>
              <h3>See the whole system</h3>
              <p>A component tree, a dependency graph, and a live map answer the questions frameworks can&rsquo;t: what depends on what, what breaks if I remove this model, and where is every agent working right now.</p>
              <div className="shot"><img src="/img/shot-deps.svg" alt="Dependency graph pivoted by model, highlighting delete impact" loading="lazy" /></div>
            </div>
            <div className="pillar reveal">
              <span className="state-dot" style={{ background: "var(--green)" }}></span>
              <h3>Measure everything</h3>
              <p>Every prompt, tool call, routing decision, and reward score lands in a replayable event log. Dashboards break spend down by model, provider, workflow, and agent — and budgets pause runs instead of surprising you.</p>
              <div className="shot"><img src="/img/shot-dashboard.svg" alt="Cost and usage dashboard with stacked daily spend and model distribution" loading="lazy" /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="split">
            <div className="reveal">
              <p className="eyebrow">Reward-guided decoding · ICCV 2025</p>
              <h2>A quality dial on every generation.</h2>
              <p className="lede">
                Maestro implements MRGD — multimodal reward-guided decoding. Instead of accepting
                the first answer, it samples k candidate continuations every sentence, scores each
                against your reward models, and keeps only the best.
              </p>
              <div className="formula">
                s = <span className="w">w</span>·r_hal + (1−<span className="w">w</span>)·<span className="r">r_rec</span>
              </div>
              <p style={{ color: "var(--muted)" }}>
                Turn <strong style={{ color: "var(--ivory)" }}>w</strong> toward precision or recall
                at run time — no retraining, no redeploys. Works with learned reward models,
                programmatic scorers, LLM judges, or your own scripts.
              </p>
              <div className="statline">
                <div className="stat"><div className="n">~70%</div><div className="l">fewer hallucinated objects vs. greedy decoding*</div></div>
                <div className="stat"><div className="n">k=5</div><div className="l">outperforms best-of-30 rejection sampling*</div></div>
                <div className="stat"><div className="n">~k×</div><div className="l">cost shown before you run — never after</div></div>
              </div>
              <p style={{ marginTop: 22, fontSize: "0.82rem", color: "var(--faint)" }}>
                *Results from <a href="https://arxiv.org/abs/2508.11616">&ldquo;Controlling Multimodal LLMs via Reward-guided Decoding&rdquo;</a> (Mañas et al., ICCV 2025), the paper Maestro&rsquo;s engine implements.
              </p>
            </div>
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-mrgd.svg" alt="MRGD inspector showing five scored candidates in round three, with the best selected" /></div>
              <figcaption>The MRGD inspector — every round, every candidate, every score.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">In development · the agent platform layer</p>
            <h2>Agents that remember, learn,<br />and answer you anywhere.</h2>
            <p className="lede">
              Phase 2 turns Maestro from an IDE into a companion: persistent memory, skills your
              agents write themselves, multi-agent rooms, and a headless service that keeps working
              after you close the window.
            </p>
          </div>
          <div className="split">
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-rooms.svg" alt="A multi-agent room where researcher, writer and critic agents collaborate with @mention routing" loading="lazy" /></div>
              <figcaption>Rooms — three agents, one conversation, @mention routing. Bound to a Telegram group.</figcaption>
            </figure>
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-memory.svg" alt="Memory panel with editable entries and a skills review queue with a draft awaiting approval" loading="lazy" /></div>
              <figcaption>Memory you can read and edit — and skills that never activate without your approval.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section alt" id="features">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">The full score</p>
            <h2>Everything in the blueprint.</h2>
            <p className="lede">
              Every capability, honestly labeled. <span className="badge badge-now">Available</span>{" "}
              ships in the current preview; <span className="badge badge-dev">In development</span>{" "}
              is specified, staged, and on the <a href="#roadmap">roadmap</a>.
            </p>
          </div>
          <div className="fgrid">
            {FEATURES.map((f) => (
              <div className="fcard reveal" key={f.title}>
                <h3>
                  {f.title}{" "}
                  <span className={`badge ${f.dev ? "badge-dev" : "badge-now"}`}>
                    {f.dev ? "In development" : "Available"}
                  </span>
                </h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="roadmap">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Roadmap · built in staged movements</p>
            <h2>Where the build stands.</h2>
            <p className="lede">Maestro is developed against a public blueprint and a staged specification — each stage ends with working, tested software.</p>
          </div>
          <div className="stages">
            {STAGES.map((s) => (
              <div className={`stage-item reveal ${s.cls ?? ""}`} key={s.tag}>
                <div className="tag">{s.tag}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band alt section">
        <div className="wrap reveal">
          <p className="eyebrow" style={{ textAlign: "center" }}>Take the podium</p>
          <h2>Your agents are waiting for a conductor.</h2>
          <p className="lede" style={{ textAlign: "center", marginBottom: 30 }}>
            Follow the build — get an email when a stage ships. No noise in between.
          </p>
          <NewsletterForm />
          <div className="hero-cta" style={{ justifyContent: "center", marginTop: 26 }}>
            <Link className="btn btn-ghost" href="/how-to/getting-started">Get started</Link>
            <Link className="btn btn-ghost" href="/faq">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
