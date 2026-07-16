export type FaqEntry = { question: string; answerHtml: string };

// Seed content for the faqs table — also the fallback served when the
// database is unreachable. Answers are HTML fragments (trusted, authored here).
export const FAQ_SEED: FaqEntry[] = [
  {
    question: "What exactly is Maestro Studio?",
    answerHtml:
      "<p>A desktop application for building, running, and observing multi-agent AI systems. You compose workflows visually on a canvas, register the models you want to use (any provider, hosted or local), define a routing matrix that sends each kind of task to the right model, and watch every agent work in real time on a live map of your system. It also implements MRGD — reward-guided decoding — as a quality dial on any generation step.</p>",
  },
  {
    question: "What is an AI agent harness — and is Maestro one?",
    answerHtml:
      "<p>An <strong>AI agent harness</strong> is the scaffolding around a language model that turns it into a working agent: the loop that feeds it tools, executes its tool calls, manages context and memory, enforces budgets and permissions, and records what happened. Frameworks give you this as a library; Maestro gives it to you as an instrument — the harness is visual (the canvas and live agent map), the guardrails are first-class (budgets, approvals, sandbox policies), and every run is a replayable event log. So yes: Maestro is an agent harness, an <strong>AI agent orchestration platform</strong> on top of it, and an IDE around both.</p>",
  },
  {
    question: "What is AI agent orchestration?",
    answerHtml:
      "<p><strong>AI agent orchestration</strong> is coordinating multiple AI agents — each with its own role, model, tools, and memory — so they work together on a task: sequencing them, running them in parallel, routing the right work to the right model, handling failures, and keeping humans in the loop where it matters. In Maestro, orchestration is a drawing: you compose the system on a canvas with typed connections, a routing matrix decides which model serves each kind of task, and the live agent map shows exactly where every agent is working while the system runs.</p>",
  },
  {
    question: "Which platforms does it run on?",
    answerHtml:
      "<p>Windows 10+ (x64), macOS 12+ (Apple Silicon and Intel), and mainstream Linux distributions (Ubuntu 22.04+, Fedora 39+), from platform-standard installers. It's a single Rust codebase across all three — the core feature set is identical everywhere.</p>",
  },
  {
    question: "Can I use it today?",
    answerHtml:
      "<p>Yes. The whole blueprint — the orchestration IDE and the agent platform layer — is now implemented and ships in the current Alpha build: the canvas and orchestrator with event-log replay, the live agent map, the MRGD engine, real media generation, persistent memory, self-authored skills, the messaging gateway, natural-language schedules, sandboxed Docker/SSH backends, browser automation with vision, multi-agent rooms, the web console, and trajectory export.</p><p>It is an <strong>Alpha</strong>: builds are unsigned and rough in places, so expect bugs. Signed and notarized installers, stability, and production hardening arrive with Beta. See the <a href=\"/#roadmap\">roadmap</a>.</p>",
  },
  {
    question: "Do I need my own API keys?",
    answerHtml:
      "<p>Yes. Maestro is bring-your-own-model: you supply keys for hosted providers (Anthropic, OpenAI-compatible endpoints, Gemini, ElevenLabs, and so on) or point it at local runtimes like Ollama or vLLM, which need no keys at all. Maestro itself has no accounts, no cloud, and no middleman on your API traffic.</p>",
  },
  {
    question: "Does it work offline?",
    answerHtml:
      "<p>With local providers, yes — fully. A setup built on Ollama or vLLM plus local image and speech models makes zero non-provider network calls. That's a stated requirement, not a side effect: local-only operation is part of the blueprint's security section.</p>",
  },
  {
    question: "How many models can I register?",
    answerHtml:
      "<p>There is no cap. The registry is designed to stay usable — search, filter, group — with 500+ models registered. Providers without a built-in adapter can be added through a template-driven generic HTTP adapter, so new services don't require a software update.</p>",
  },
  {
    question: "What is MRGD, in one paragraph?",
    answerHtml:
      "<p>Multimodal reward-guided decoding, from the ICCV 2025 paper <a href=\"https://arxiv.org/abs/2508.11616\">\"Controlling Multimodal LLMs via Reward-guided Decoding\"</a>. Instead of accepting a model's first answer, the engine samples k candidate continuations every sentence, scores each with a weighted combination of reward models (a hallucination detector and an object-recall scorer in the paper — pluggable in Maestro), keeps the best, and repeats. The weight is a runtime dial between precision and recall. In the paper's benchmarks it cut hallucinated objects by roughly 70% versus greedy decoding, and sentence-level guidance with k=5 beat picking the best of 30 full generations.</p>",
  },
  {
    question: "Doesn't MRGD make generation expensive?",
    answerHtml:
      "<p>It multiplies generation cost by roughly k (the number of candidates), so k=5 costs about five times base sampling — which is why Maestro shows you the estimate <em>before</em> the run and the actuals after. Latency grows less than linearly because candidates are generated in batches. You choose where quality is worth it: MRGD is per-node, not global.</p>",
  },
  {
    question: "Where are my API keys stored?",
    answerHtml:
      "<p>In your operating system's credential store — macOS Keychain, Windows Credential Manager, or Secret Service on Linux — with an encrypted-file vault as fallback where no keychain exists. Keys are entered once, displayed only masked, and never written to project files, exports, or logs. Project files carry an opaque reference, nothing more.</p>",
  },
  {
    question: "Does Maestro send telemetry?",
    answerHtml:
      "<p>No. All product analytics are opt-in and disabled by default. Additionally, every run records an outbound-transparency list — every external endpoint contacted, with payload sizes — so you can verify exactly where your data went.</p>",
  },
  {
    question: "What happens when a provider fails mid-run?",
    answerHtml:
      "<p>The router fails over to the next model in that rule's fallback chain, in the order you defined, and logs the failover visibly. Node-level retries with backoff handle transient errors first. If the whole chain is exhausted, the node's on-error policy decides: fail the run, continue with a default, or route to an error branch.</p>",
  },
  {
    question: "Can agents spend money without me noticing?",
    answerHtml:
      "<p>No. Token, cost, and wall-clock budgets apply per agent and per run, and they're checked after every model and tool call. On breach, the run pauses at a safe point and asks you to extend or stop. Silent overruns are explicitly forbidden by the blueprint — that's an acceptance-tested behavior.</p>",
  },
  {
    question: "Agents writing their own skills sounds risky. Is it?",
    answerHtml:
      "<p>Drafts are inert. When an agent finishes a hard task and writes up the method as a skill, that draft goes into a review queue where a human approves or rejects it — nothing activates on its own. Imported skills additionally pass a static safety scan (embedded commands, network calls, and suspicious payloads are surfaced) before they can be enabled. This is deliberately stricter than the tools that inspired the feature.</p>",
  },
  {
    question: "Can I talk to my agents from Telegram or Slack?",
    answerHtml:
      "<p>That's the Phase-2 messaging gateway: Telegram, Discord, and Slack first, more platforms behind a documented bridge contract. Access is gated by pairing codes — only platform identities you've explicitly paired can address an agent — and privileged actions from remote channels go through the same approval flow as everywhere else. Conversations continue across surfaces: start at your desk, finish on your phone.</p>",
  },
  {
    question: "What's the difference between Phase 1 and Phase 2?",
    answerHtml:
      "<p>Phase 1 is the orchestration IDE: canvas, models, routing, orchestrator, live map, MRGD, media routing, observability. Phase 2 is the agent-platform layer: persistent memory, self-authored skills, the messaging gateway, schedules with a headless service, sandboxed execution backends, browser tools, multi-agent rooms, profiles and a web console, trajectory export, and MCP. Both phases are fully specified; Phase 2 stages begin after Phase 1 reaches GA.</p>",
  },
  {
    question: "How does Maestro compare to workflow tools and agent frameworks?",
    answerHtml:
      "<p>Three things are hard to find together elsewhere: a live map that shows where every agent is working in real time (not a log to tail), research-grade reward-guided decoding as a per-node quality dial, and a routing matrix that covers every modality — image, video, speech, embeddings — not just chat completions. Add the replayable event log and the phase-2 learning loop (memory plus approved skills), and the whole is the product: one instrument panel instead of a framework plus scripts plus dashboards.</p>",
  },
  {
    question: "Is Maestro related to the Hermes projects?",
    answerHtml:
      "<p>Maestro's Phase-2 blueprint openly credits Hermes Agent (Nous Research) and Hermes Studio (EKKOLearnAI) as feature references — the blueprint contains a capability map tracing every feature to its source, including where Maestro deliberately deviates (for example: skills require human approval, and there are no default service credentials). The implementation is original and written in Rust; no code is shared. Maestro also embraces the same open SKILL.md standard so skills are portable.</p>",
  },
  {
    question: "What will it cost? Is it open source?",
    answerHtml:
      "<p>Licensing and pricing haven't been announced yet. What is settled in the blueprint: Maestro is self-hosted, has no cloud dependency of its own, uses your model keys directly, and stores everything in readable local files. Whatever the license ends up being, your data and your workflows are yours.</p>",
  },
  {
    question: "Are the screenshots on this site real?",
    answerHtml:
      "<p>They are interface previews rendered from the product's design specification (MSTRO-SPEC-001) — pixel-accurate to the layouts, colors, and data the spec defines. They are design previews, not screenshots of the running Alpha; as the product stabilizes toward Beta they are being replaced with captures from the running app.</p>",
  },
];
