import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features",
  description:
    "A full tour of Maestro Studio: the visual canvas, live agent map, routing matrix, MRGD reward-guided decoding, observability, memory, skills, rooms, gateway, and more.",
};

const PLATFORM_CARDS: { title: string; body: string }[] = [
  { title: "Persistent memory", body: "Agents remember preferences, project context, and your environment across sessions. Entries are plain files — visible, editable, deletable, versionable. Full-text recall over every past session, summarized with sources." },
  { title: "Skills with an approval gate", body: "After a hard task succeeds, the agent drafts a reusable SKILL.md (agentskills.io-compatible). You review and approve before it ever activates. Skills version themselves and propose their own improvements — as diffs, for you to accept." },
  { title: "Multi-agent rooms", body: "@mention a specific agent or let a moderator route. Shared context compresses automatically when it outgrows the smallest model's window — losslessly, with the originals kept in the event log." },
  { title: "Messaging gateway", body: "Telegram, Discord, and Slack first; Matrix and more behind a documented bridge contract. Pairing codes gate access; voice memos are transcribed through your STT route; conversations continue across surfaces." },
  { title: "Schedules & headless service", body: "Describe a schedule in plain language, confirm the parsed cron, pick a delivery channel. The background service runs it — and honors the same budgets, sandbox, and approval rules as Studio." },
  { title: "Execution backends", body: "Local, hardened Docker (read-only root, dropped capabilities, no network unless granted), SSH remotes, and cloud sandboxes — selectable per project, overridable per node, logged per tool call. Plus a file browser over all of them." },
  { title: "Browser & web tools", body: "Search, extract pages to clean markdown, and drive a real browser — navigate, click, type, screenshot — with vision analysis closing the loop and hard rules against touching credentials or payment fields." },
  { title: "Chat surface, voice in and out", body: "A first-class chat panel with streaming tool traces, interrupt-and-redirect, and /model switching mid-conversation. Speak to your agents and let them answer aloud — through whichever STT and TTS models your matrix routes to." },
  { title: "Profiles, accounts & web console", body: "A self-hosted service with real accounts, roles, and isolated profiles — plus a browser console for chat, runs, jobs, files, and dashboards. No default passwords, localhost by default, TLS for anything wider." },
  { title: "Trajectory export", body: "Batch-run a workflow over a dataset and export the tool-call trajectories as ShareGPT or JSONL, curated by outcome or reward score. Your best runs become training data for your next model." },
  { title: "MCP integration", body: "Attach any Model Context Protocol server — stdio or HTTP — and its tools join your agents' toolboxes under the same allowlists, sandbox, and approval policies." },
  { title: "CLI", body: "The same core, headless: maestro chat, maestro run, maestro jobs, maestro doctor. One service, one event log, many surfaces." },
];

export default function FeaturesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">The full tour</p>
          <h1>Every feature, movement by movement.</h1>
          <p className="lede">
            Maestro is built against a public blueprint in two phases: the orchestration studio, then
            the agent platform layer. Everything below is in that blueprint — labeled{" "}
            <span className="badge badge-now">Available</span> or{" "}
            <span className="badge badge-dev">In development</span> so you always know what ships today.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Compose <span className="dot">·</span> Phase 1 <span className="badge badge-now">Available</span></p>
            <h2>The canvas is the score.</h2>
            <p className="lede">
              Drag components from the palette — agents, model calls, routers, prompt templates,
              tools, conditions, loops, human approvals, MRGD decode, reward models, sub-workflows —
              and wire them with typed edges. Text ports don&rsquo;t accept images; incompatible
              connections are refused on the spot, with the reason. A Problems panel catches
              unresolved references, cycles, and missing config before anything runs.
            </p>
          </div>
          <figure className="shotfig reveal">
            <div className="frame"><img src="/img/shot-canvas.svg" alt="Maestro canvas: a captioning workflow running, with agent badges on active nodes, a component tree, and a streaming run log" /></div>
            <figcaption>A run in flight: pulsing nodes, animated edges, agent badges in both the canvas and the tree, and a routing decision explained in the log.</figcaption>
          </figure>
          <div className="pillars" style={{ marginTop: 36 }}>
            <div className="pillar reveal"><h3>Live agent map</h3><p>Each active agent carries a colored badge — violet thinking, cyan calling a model, amber waiting on a tool, orange waiting on you. With three agents running in parallel, you can say where each one is within two seconds. That&rsquo;s an acceptance criterion, not a slogan.</p></div>
            <div className="pillar reveal"><h3>Canvas ⇄ JSON, always in sync</h3><p>Every workflow is a readable JSON file that git can diff. Edit on the canvas or in the built-in editor — both views are the same document, and invalid JSON is rejected with precise errors.</p></div>
            <div className="pillar reveal"><h3>Sub-workflows &amp; frames</h3><p>Group nodes into collapsible frames, convert them into reusable sub-workflows, and compose systems from systems. Undo covers at least a hundred steps.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Route <span className="dot">·</span> Phase 1 <span className="badge badge-now">Available</span></p>
            <h2>Unlimited models. One matrix.</h2>
            <p className="lede">
              Register as many models as you like — hosted or local — and let the routing matrix
              decide which one handles each kind of task. Rules carry conditions (minimum context,
              cost tier, tags like <code>local-only</code> or <code>eu-region</code>) and ordered
              fallback chains that take over automatically when a provider fails.
            </p>
          </div>
          <figure className="shotfig reveal">
            <div className="frame"><img src="/img/shot-routing.svg" alt="Routing matrix: rules for text, code, image, video, TTS, STT and reward scoring, with a test console explaining a decision" /></div>
            <figcaption>The test console answers &ldquo;which model would handle this?&rdquo; — without spending a cent.</figcaption>
          </figure>
          <div className="pillars" style={{ marginTop: 36 }}>
            <div className="pillar reveal"><h3>Any provider</h3><p>Anthropic, OpenAI-compatible endpoints (OpenAI, Azure, Groq, Together, OpenRouter, vLLM, LM Studio…), Gemini, Ollama, ElevenLabs, Stability-style image backends — and a generic HTTP adapter for anything else, no code required.</p></div>
            <div className="pillar reveal"><h3>Keys stay in the keychain</h3><p>Credentials are entered once and stored only in your OS keychain. Project files, exports, and logs carry an opaque reference — never the key. Test any model&rsquo;s connection with one click.</p></div>
            <div className="pillar reveal"><h3>Cost-aware failover</h3><p>Prefer the cheapest eligible model, or pin quality where it matters. Every failover is logged and shown — you always know which model actually answered.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Decode <span className="dot">·</span> Phase 1 <span className="badge badge-dev">In development</span></p>
            <h2>MRGD: quality you can steer at run time.</h2>
            <p className="lede">
              Maestro implements multimodal reward-guided decoding from the ICCV 2025 paper{" "}
              <a href="https://arxiv.org/abs/2508.11616">&ldquo;Controlling Multimodal LLMs via Reward-guided Decoding&rdquo;</a>.
              Enable it on any generation node: the engine samples k candidate continuations every
              sentence, scores each with your weighted mix of reward models, keeps the best, and
              repeats. In the paper&rsquo;s benchmarks this cut hallucinated objects by ~70% versus
              greedy decoding — and k=5 with sentence-level guidance beat best-of-30 rejection sampling.
            </p>
          </div>
          <figure className="shotfig reveal">
            <div className="frame"><img src="/img/shot-mrgd.svg" alt="MRGD inspector: five candidates with per-reward score bars, the selected candidate highlighted, and a runtime weight slider" /></div>
            <figcaption>Four scorer types: learned reward endpoints, programmatic object-recall, LLM-as-judge, and your own scripts.</figcaption>
          </figure>
          <div className="pillars" style={{ marginTop: 36 }}>
            <div className="pillar reveal"><h3>Presets you can trust</h3><p>Precision (w=1.0), Balanced (w=0.5), Recall (w=0.0) — with honest guidance that the best weight depends on your content, and A/B runs to find it.</p></div>
            <div className="pillar reveal"><h3>Costs declared up front</h3><p>MRGD multiplies generation cost by roughly k. Maestro estimates it before you run and reports actuals after — the trade-off is always yours to make.</p></div>
            <div className="pillar reveal"><h3>Best-of-k for media</h3><p>The same idea extends to images and audio: generate k artifacts, score each with a judge you choose, keep the winner, inspect the alternates. Clearly labeled as Maestro&rsquo;s extension of the paper.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Observe <span className="dot">·</span> Phase 1 <span className="badge badge-dev">In development</span></p>
            <h2>Runs you can replay. Spend you can see.</h2>
            <p className="lede">
              Every run writes an append-only event log — prompts, responses, tool calls, routing
              decisions, reward scores, costs. Scrub through any historical run step by step, open
              any node&rsquo;s inputs and outputs, and read the Gantt timeline to see what ran in
              parallel, what retried, and what failed over.
            </p>
          </div>
          <div className="split">
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-dashboard.svg" alt="Dashboard: 30-day stacked spend by task type, model distribution, cache hit rate, budgets and alerts" loading="lazy" /></div>
              <figcaption>Spend by model, provider, workflow, task type, and agent — with cache hit rates and 30-day trends.</figcaption>
            </figure>
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-deps.svg" alt="Dependency graph highlighting what breaks if a model is deleted" loading="lazy" /></div>
              <figcaption>&ldquo;What breaks if I delete this?&rdquo; — answered before you delete it.</figcaption>
            </figure>
          </div>
          <div className="pillars" style={{ marginTop: 36 }}>
            <div className="pillar reveal"><h3>Budgets that pause, not surprise</h3><p>Token, cost, and time budgets per agent and per run. On breach, the run pauses at a safe point and asks — overruns are never silent.</p></div>
            <div className="pillar reveal"><h3>Outbound transparency</h3><p>A per-run list of every external endpoint contacted, with payload sizes. Local-only setups make zero non-provider network calls.</p></div>
            <div className="pillar reveal"><h3>Alerts</h3><p>Set thresholds on run cost, error rate, or latency and get notified in the app — and, once the gateway lands, on any channel you&rsquo;ve connected.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">The agent platform <span className="dot">·</span> Phase 2 <span className="badge badge-dev">In development</span></p>
            <h2>From studio to companion.</h2>
            <p className="lede">Phase 2 adds the layer that makes agents feel less like scripts and more like colleagues — specified in the same public blueprint, built in the same staged way.</p>
          </div>
          <div className="split">
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-memory.svg" alt="Memory entries with edit controls, cross-session recall search, and a skills review queue" loading="lazy" /></div>
              <figcaption>Memory &amp; skills — transparent, file-based, human-approved.</figcaption>
            </figure>
            <figure className="shotfig reveal">
              <div className="frame"><img src="/img/shot-rooms.svg" alt="Multi-agent room with researcher, writer and critic collaborating under moderator routing" loading="lazy" /></div>
              <figcaption>Rooms — collaborative conversations that can become workflows.</figcaption>
            </figure>
          </div>
          <div className="fgrid" style={{ marginTop: 36 }}>
            {PLATFORM_CARDS.map((c) => (
              <div className="fcard reveal" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band alt section">
        <div className="wrap reveal">
          <h2>See it in practice.</h2>
          <p className="lede" style={{ textAlign: "center", marginBottom: 30 }}>
            The how-to guides walk through each of these, step by step.
          </p>
          <div className="hero-cta" style={{ justifyContent: "center" }}>
            <Link className="btn btn-primary" href="/how-to">Browse the guides</Link>
            <Link className="btn btn-ghost" href="/faq">Read the FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
