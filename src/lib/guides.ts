export type Guide = {
  slug: string;
  title: string;
  description: string;
  group: "Start here" | "Core" | "Agent platform";
  card: { k: string; blurb: string };
  bodyHtml: string; // trusted HTML authored in this repo, rendered inside .docs-main
};

export const GUIDES: Guide[] = [
  {
    slug: "getting-started",
    title: "Getting started",
    description:
      "Install Maestro IDE, create your first project, register models with keychain-safe keys, set up routing, and run your first workflow — in about fifteen minutes.",
    group: "Start here",
    card: { k: "Start here · 15 min", blurb: "Create a project, register your first models, store keys safely, and run a three-node workflow — the quarter-hour tour." },
    bodyHtml: `
<p class="eyebrow">Start here · about 15 minutes</p>
<h1>Getting started</h1>
<p class="lede">By the end of this guide you'll have a project, two registered models with safely stored keys, a routing rule, and a completed first run.</p>

<h2>1. Install</h2>
<p>Maestro ships as a native installer per platform: MSI/NSIS on Windows, a DMG on macOS, AppImage or .deb on Linux. Run it, launch Maestro, and you'll land in an empty workspace with the canvas in the center, the component tree on the left, the inspector on the right, and the console at the bottom. Dark theme is the default; switch anytime in Settings.</p>
<div class="callout"><strong>Availability note.</strong> Maestro is in staged development — signed installers arrive with the Phase-1 GA stage. Until then, preview builds are produced from source. Everything below describes the product as specified in the public blueprint.</div>

<h2>2. Create a project</h2>
<ol class="steps">
  <li><strong>File → New Project</strong>, pick a folder, name it (say, <code>hello-maestro</code>).</li>
  <li>Look at the folder Maestro created. Everything is a readable file — <code>maestro.json</code>, <code>models.json</code>, <code>routing/</code>, <code>workflows/</code>. Commit it to git if you like; secrets never live in these files.</li>
</ol>
<pre><code>hello-maestro/
├── maestro.json        # project settings
├── models.json         # model registry (references only — no keys)
├── routing/default.json
└── workflows/</code></pre>

<h2>3. Register your first two models</h2>
<p>You bring your own models. Register one hosted model and one local one so you can feel the difference:</p>
<ol class="steps">
  <li>Open <strong>Models</strong> and choose <strong>Add model</strong>.</li>
  <li>Pick a provider — say <em>Anthropic</em> — enter the model name (e.g. <code>claude-sonnet-5</code>), and declare its capabilities (text generation, code generation, vision understanding).</li>
  <li>When asked for the API key, paste it once. It goes straight into your OS keychain (macOS Keychain, Windows Credential Manager, or Secret Service on Linux). From now on you'll only ever see <code>••••</code> and the last four characters.</li>
  <li>Click <strong>Test connection</strong>. Maestro makes one minimal real call and reports latency, or an error message that tells you exactly what to fix.</li>
  <li>Now add a local model: if you run <a href="https://ollama.com">Ollama</a>, choose the Ollama provider — no key needed — and register e.g. <code>llama3.3</code>. Local models work fully offline.</li>
</ol>
<div class="callout tip"><strong>Tip.</strong> There's no model limit. Register everything you might ever route to — disabled models cost nothing and the registry stays fast well past 500 entries.</div>

<h2>4. Point the routing matrix at them</h2>
<p>The matrix decides which model handles each kind of task. New projects ship with one empty row per task type:</p>
<ol class="steps">
  <li>Open <strong>Routing</strong>. Find the <code>text-generation</code> row.</li>
  <li>Set <strong>Primary</strong> to your hosted model, and add the local model as <strong>Fallback</strong> — if the hosted provider ever fails or rate-limits, the run continues locally, and the failover is logged.</li>
  <li>Open the <strong>test console</strong>, type "summarize this paragraph", and confirm the decision trace shows your rule matching. No tokens are spent.</li>
</ol>

<h2>5. Run your first workflow</h2>
<ol class="steps">
  <li>Create a workflow and drag three nodes from the palette: <strong>Input → Model Call → Output</strong>.</li>
  <li>Connect the ports (text → text — the editor won't let you mis-wire types).</li>
  <li>On the Model Call node, choose <strong>Route by task type: text-generation</strong> — this is the habit worth building; workflows stay portable while the matrix decides models.</li>
  <li>Press <strong>Run ▶</strong>, type a prompt into the Input, and watch: the node pulses, tokens stream into the console, and the routing decision appears in the log ("matched rule 1 → claude-sonnet-5 …").</li>
  <li>Open <strong>Runs</strong> and click the run you just made — every event was recorded and can be replayed later.</li>
</ol>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/first-workflow">Build your first real workflow</a> — agents, approval gates, and budgets.</li>
  <li><a href="/how-to/routing-matrix">Master the routing matrix</a> — conditions, media routing, cost-aware fallbacks.</li>
  <li><a href="/how-to/mrgd-tuning">Tune quality with MRGD</a> — the per-node quality dial.</li>
</ul>`,
  },
  {
    slug: "first-workflow",
    title: "Build your first real workflow",
    description:
      "Build a research → draft → review pipeline in Maestro IDE with two agents, a human approval gate, parallel execution, and a spending budget.",
    group: "Start here",
    card: { k: "Start here · 25 min", blurb: "A research → draft → review pipeline with two agents, a human approval gate, and a budget that keeps it honest." },
    bodyHtml: `
<p class="eyebrow">Start here · about 25 minutes</p>
<h1>Build your first real workflow</h1>
<p class="lede">A research → draft → review pipeline: two agents working in sequence, a critic checking their output, you approving the final result — and a budget making sure nothing runs away.</p>

<figure class="shotfig">
  <div class="frame"><img src="/img/shot-canvas.svg" alt="The finished workflow running on the canvas, with agent badges live on the active nodes"></div>
  <figcaption>The finished pipeline mid-run — agent badges show who's working where.</figcaption>
</figure>

<h2>1. Lay out the graph</h2>
<ol class="steps">
  <li>Create a workflow named <code>research-review</code> and drag on: <strong>Input</strong>, two <strong>Agent</strong> nodes, one <strong>Human Approval</strong> node, and an <strong>Output</strong>.</li>
  <li>Wire them: Input → agent "researcher" → agent "writer" → Human Approval → Output.</li>
  <li>Notice the Problems panel: it flags the unconfigured agents. Maestro validates before running — you can't launch a broken graph by accident.</li>
</ol>

<h2>2. Configure the researcher</h2>
<ol class="steps">
  <li>Select the first Agent node. In the inspector, set its <strong>role prompt</strong>: <em>"You are a meticulous researcher. Gather relevant facts for the given brief and return them as a bulleted list with one-line sources."</em></li>
  <li>Set <strong>binding</strong> to <em>Route by task type: text-generation</em> — the matrix picks the model.</li>
  <li>Set <strong>max iterations</strong> to 4 and leave autonomy on <em>Auto</em>.</li>
</ol>

<h2>3. Configure the writer</h2>
<ol class="steps">
  <li>Role prompt: <em>"You are a clear, plain-spoken writer. Turn the research notes into a 300-word draft. No exclamation marks."</em></li>
  <li>Bind it to a fixed model if you have a favorite for prose — fixed bindings and routed bindings mix freely in one workflow.</li>
</ol>

<h2>4. Add the approval gate and a budget</h2>
<ol class="steps">
  <li>Select the <strong>Human Approval</strong> node. When the run reaches it, Maestro pauses that branch and shows you the draft with <strong>Approve / Reject / Edit</strong>. Your edit — not the agent's — is what flows onward if you change anything.</li>
  <li>Select the canvas background to open workflow settings, and set a <strong>run budget</strong>: $0.50. If the run ever hits it, execution pauses at a safe point and asks you — it never overruns silently.</li>
</ol>

<h2>5. Run it and read the live map</h2>
<ol class="steps">
  <li>Press <strong>Run ▶</strong> and give it a brief ("three surprising facts about sea otters, with sources").</li>
  <li>Watch the researcher's badge appear on its node — cyan while it calls the model, violet while it thinks. The component tree mirrors the same state.</li>
  <li>When the approval request appears, read the draft, tweak a sentence with <strong>Edit</strong>, and approve.</li>
  <li>Open <strong>Runs → this run</strong>. The Gantt timeline shows both agents' spans, your approval pause, and per-node token costs. Click any bar for exact inputs and outputs.</li>
</ol>

<div class="callout tip"><strong>Make it parallel.</strong> Add a second researcher and a <strong>Join</strong> node: independent branches run concurrently up to your concurrency limit, and the live map shows both badges working at once.</div>

<div class="callout"><strong>Reusable pieces.</strong> Select the two research nodes, group them into a frame, and convert the frame into a sub-workflow — it becomes a single node you can drop into any other workflow.</div>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/mrgd-tuning">Add an MRGD Decode node</a> after the writer to raise draft quality measurably.</li>
  <li><a href="/how-to/routing-matrix">Refine the matrix</a> so research routes to a cheap model and prose to a premium one.</li>
</ul>`,
  },
  {
    slug: "routing-matrix",
    title: "Master the routing matrix",
    description:
      "How to route text, code, image, video, and speech tasks to different models in Maestro IDE: rules, conditions, fallback chains, cost-aware routing, and the test console.",
    group: "Core",
    card: { k: "Core · 20 min", blurb: "Rules, conditions, fallback chains, and cost-aware routing — and how to route image, video, and speech tasks to different models in seconds." },
    bodyHtml: `
<p class="eyebrow">Core · about 20 minutes</p>
<h1>Master the routing matrix</h1>
<p class="lede">The matrix is Maestro's answer to a simple problem: different tasks deserve different models, and hard-coding models into workflows makes both fragile. Route by task type once; change models forever after in one place.</p>

<figure class="shotfig">
  <div class="frame"><img src="/img/shot-routing.svg" alt="Routing matrix editor showing rules for every task type with conditions, primaries, and fallback chains"></div>
  <figcaption>One row per task type. First matching rule wins; fallbacks fail over in order.</figcaption>
</figure>

<h2>How resolution works</h2>
<p>When a node routes by task type, Maestro walks the enabled rules for that type, top to bottom, and picks the first whose <em>conditions</em> all hold. The chosen rule contributes a primary model and an ordered fallback chain. Every decision is logged with its reasons — which rule matched, which models were rejected and why.</p>

<h2>Route media in seconds</h2>
<ol class="steps">
  <li>Open <strong>Routing</strong>. The default matrix already has one row per task type: <code>image-generation</code>, <code>video-generation</code>, <code>audio-generation</code>, <code>tts</code>, <code>stt</code>, <code>embedding</code>, and the text/code rows.</li>
  <li>On the <code>image-generation</code> row, open the Primary dropdown and pick your image model. That's it — every image node and every agent that generates images now uses it.</li>
  <li>Do the same for <code>tts</code> (say, ElevenLabs hosted) and <code>stt</code> (say, local Whisper). Mixing hosted and local per task is the point.</li>
</ol>

<h2>Add conditions</h2>
<p>Conditions refine when a rule applies. All conditions on a rule must hold:</p>
<ul>
  <li><strong>Minimum context window</strong> — skip small models for long-document tasks.</li>
  <li><strong>Max cost tier</strong> — free / cheap / standard / premium ceilings.</li>
  <li><strong>Required tags</strong> — e.g. <code>local-only</code> for sensitive projects, <code>eu-region</code> for data-boundary rules. The router refuses to route tagged work to untagged models.</li>
  <li><strong>Input has image</strong> — send vision-bearing requests to models that can see.</li>
  <li><strong>Latency class</strong> — realtime rows for interactive work, batch rows for overnight jobs.</li>
</ul>
<p>Stack two rules for the same task type: a strict rule first (long-context, premium), a general rule below it. First match wins.</p>

<h2>Design good fallback chains</h2>
<ol class="steps">
  <li>Give every important rule at least one fallback — the demo that survives a provider outage is the one with a chain.</li>
  <li>Order matters: put the closest-quality substitute first and a local model last as the always-available floor.</li>
  <li>Enable <strong>prefer cheapest</strong> on rules where quality is fungible — the router re-orders eligible candidates by estimated cost.</li>
</ol>
<div class="callout"><strong>Failover is visible.</strong> When a primary fails and a fallback answers, the run log records it and the run detail shows which model actually served each call. You'll never wonder silently.</div>

<h2>Test without spending</h2>
<ol class="steps">
  <li>Open the <strong>test console</strong> in the Routing view.</li>
  <li>Describe a request — "transcribe this voice memo", attach-type: audio — and read the decision: matched rule, chosen model, rejected candidates with reasons.</li>
  <li>Keep multiple named matrices — <code>cheap-dev</code> for iteration, <code>prod-quality</code> for real runs — and switch per run. Matrices are project files; diff them in git like everything else.</li>
</ol>

<div class="callout tip"><strong>Habit worth keeping.</strong> Bind workflow nodes to task types, not models. Workflows stay portable across projects and teams; the matrix is where model opinions live.</div>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/mrgd-tuning">MRGD tuning</a> — the <code>reward-scoring</code> row routes your reward models too.</li>
  <li><a href="/how-to/first-workflow">Your first real workflow</a> — see routing decisions live in a run.</li>
</ul>`,
  },
  {
    slug: "mrgd-tuning",
    title: "Tune generation quality with MRGD",
    description:
      "Enable reward-guided decoding in Maestro IDE: choose scorers and weights, set k and the evaluation period, read the candidate inspector, and A/B your presets.",
    group: "Core",
    card: { k: "Core · 30 min", blurb: "Enable reward-guided decoding on a node, pick scorers, set k and the precision/recall weight, and read the inspector like a pro." },
    bodyHtml: `
<p class="eyebrow">Core · about 30 minutes <span class="badge badge-dev">In development — ships with the MRGD stage</span></p>
<h1>Tune generation quality with MRGD</h1>
<p class="lede">Reward-guided decoding turns "hope the model gets it right" into "generate five candidates and keep the best one, every sentence." This guide shows you how to enable it, what the knobs mean, and how to read the inspector.</p>

<h2>The idea in thirty seconds</h2>
<p>MRGD (from the ICCV 2025 paper <a href="https://arxiv.org/abs/2508.11616">Mañas et al.</a>) samples <strong>k</strong> candidate continuations at each step, scores each with a weighted mix of reward models, appends the winner, and repeats until the response is done:</p>
<pre><code>s(candidate) = w · r_hal + (1 − w) · r_rec

r_hal — a learned scorer that penalizes content not grounded in the input
r_rec — a programmatic scorer that rewards covering what's actually there
w     — your precision ⇄ recall dial, changeable at run time</code></pre>
<p>In the paper's benchmarks this cut hallucinated objects by ~70% versus greedy decoding, and sentence-level guidance with k=5 beat best-of-30 whole-response sampling. Maestro generalizes the recipe: any number of scorers, any weights.</p>

<h2>1. Register scorers</h2>
<p>Open <strong>Rewards</strong> and add one or more scorers. Maestro supports four kinds:</p>
<ul>
  <li><strong>Reward endpoint</strong> — an HTTP endpoint wrapping a learned reward model (image + text in, score 0–1 out).</li>
  <li><strong>Object-recall scorer</strong> — programmatic: an open-vocabulary detector finds what's in the image, embeddings match it against what the text mentions. No training required.</li>
  <li><strong>LLM-as-judge</strong> — any registered text or vision model plus a rubric prompt. The fastest way to start: judge with a strong model you already have.</li>
  <li><strong>Script scorer</strong> — your own command; candidate JSON on stdin, <code>{"score": 0.87}</code> on stdout. Runs under the sandbox policy.</li>
</ul>
<div class="callout tip"><strong>Start with a judge.</strong> An LLM-as-judge scorer with a 5-line rubric gets you 80% of the value in five minutes. Add specialized scorers when you know what failure mode you're fighting.</div>

<h2>2. Enable MRGD on a node</h2>
<ol class="steps">
  <li>Select any generation node (Agent or Model Call) — or drop a dedicated <strong>MRGD Decode</strong> node into the graph.</li>
  <li>In the inspector, switch decoding to <strong>MRGD</strong> and set:
    <ul>
      <li><strong>k</strong> — candidates per round. Default 5. The paper's sweet spot: more helps, but k=5 already beats best-of-30.</li>
      <li><strong>T</strong> — evaluation period in sentences. Default 1. Setting "whole response" turns MRGD into plain best-of-k.</li>
      <li><strong>Scorers &amp; weights</strong> — pick your scorers and drag the weights; they normalize to sum to 1.</li>
      <li><strong>Temperature</strong> — leave on "model default" unless you know better; candidate diversity is model-specific.</li>
    </ul>
  </li>
  <li>Note the <strong>cost estimate</strong> that appears: roughly k× base generation plus scorer calls. MRGD never surprises you on price.</li>
</ol>

<h2>3. Run, and read the inspector</h2>
<figure class="shotfig">
  <div class="frame"><img src="/img/shot-mrgd.svg" alt="MRGD inspector with five scored candidates and the winner highlighted"></div>
  <figcaption>Round 3: candidate 2 wins on the combined score; candidate 3 scores high on recall but is heavily penalized for hallucination.</figcaption>
</figure>
<ol class="steps">
  <li>Run the workflow and open the node's <strong>MRGD inspector</strong> tab.</li>
  <li>Each round shows all k candidates with per-scorer bars and the combined score. Watch for candidates that win recall but lose on grounding — that's the trade-off <strong>w</strong> controls.</li>
  <li>If every candidate scores similarly, your scorers aren't discriminating — sharpen the judge rubric or raise temperature for more diverse candidates.</li>
</ol>

<h2>4. Save presets and A/B them</h2>
<ol class="steps">
  <li>Save your configuration as a preset. Maestro ships three: <strong>Precision</strong> (w=1.0), <strong>Balanced</strong> (w=0.5), <strong>Recall</strong> (w=0.0).</li>
  <li>The best w is content-dependent — the paper found ~0.25 optimal on object-dense images but 1.0 on sparse ones. Don't guess: use <strong>A/B comparison</strong> to run the same node under two presets and compare outputs and scores side by side.</li>
</ol>

<div class="callout"><strong>Media too.</strong> Image and audio nodes support best-of-k: generate k artifacts, score each with a vision judge or similarity scorer, keep the winner, inspect the alternates. Maestro labels this clearly as its extension of the paper's text-focused method.</div>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/routing-matrix">The routing matrix</a> — the <code>reward-scoring</code> row decides which model judges.</li>
  <li><a href="/how-to/first-workflow">Your first real workflow</a> — add an MRGD node after the writer and measure the difference.</li>
</ul>`,
  },
  {
    slug: "telegram-agent",
    title: "Put an agent on Telegram",
    description:
      "Pair your Telegram account with a Maestro agent, chat from your phone, and schedule a daily briefing delivered while the IDE is closed.",
    group: "Agent platform",
    card: { k: "Agent platform · 20 min", blurb: "Pair your account with a code, talk to your agent from your phone, and schedule a daily briefing that arrives while the IDE is closed." },
    bodyHtml: `
<p class="eyebrow">Agent platform · about 20 minutes <span class="badge badge-dev">In development — Phase 2, gateway stage</span></p>
<h1>Put an agent on Telegram</h1>
<p class="lede">The gateway connects your agents to the messaging apps you already live in. This guide covers Telegram end to end: bot token, pairing, chatting from your phone, and a scheduled morning briefing that arrives with the IDE closed. Discord and Slack follow the same shape.</p>

<div class="callout"><strong>This feature is in development.</strong> The steps below describe the gateway exactly as specified in the Maestro blueprint (UR-1500/UR-1600), so you know how it will work when the stage ships. Follow the <a href="/#roadmap">roadmap</a> for timing.</div>

<h2>What you'll need</h2>
<ul>
  <li>The <strong>Maestro service</strong> installed (Settings → Service → Install). The gateway runs in the background service so agents answer even when the IDE window is closed.</li>
  <li>A <strong>Telegram bot token</strong> — create a bot with Telegram's @BotFather and copy the token it gives you. Your bot, your token, your data path.</li>
</ul>

<h2>1. Connect the platform</h2>
<ol class="steps">
  <li>Open <strong>Gateway</strong> in the IDE and choose <strong>Add platform → Telegram</strong>.</li>
  <li>Paste the bot token. It goes to your OS keychain like every other credential — never into config files.</li>
  <li>The connection health card flips green when the bot is listening.</li>
</ol>

<h2>2. Pair yourself</h2>
<p>Nobody can talk to your agents just by finding the bot. Access is explicit:</p>
<ol class="steps">
  <li>Click <strong>Pair a device</strong>. Maestro shows a 6-digit code (valid ten minutes).</li>
  <li>On your phone, message your bot: <code>/pair 428913</code>.</li>
  <li>The pairing appears in the IDE — bound to your account and profile, revocable anytime. Unpaired strangers get pairing instructions and nothing else.</li>
</ol>

<h2>3. Choose what remote chats may do</h2>
<ol class="steps">
  <li>On the pairing, set channel permissions: <strong>read-only</strong> (ask questions, get answers) or <strong>can execute tools</strong>.</li>
  <li>Even with tools enabled, privileged actions honor the same policies as the IDE: sandbox rules apply, and anything requiring approval sends you an approval message — reply <code>approve</code> or <code>deny</code>.</li>
</ol>

<h2>4. Talk to your agent</h2>
<ol class="steps">
  <li>Message the bot like a colleague: <em>"Summarize yesterday's run failures in the media pipeline."</em></li>
  <li>Voice memos work — audio is transcribed through your matrix's <code>stt</code> route, and you can ask for spoken replies via your <code>tts</code> route.</li>
  <li>Continuity is real: the same session is visible in the IDE chat panel. Start at your desk, continue from the bus.</li>
</ol>

<h2>5. Schedule the morning briefing</h2>
<ol class="steps">
  <li>Open <strong>Jobs → New job</strong> and type the schedule in plain language: <em>"every weekday at 8am"</em>. Maestro shows the parsed cron (<code>0 8 * * 1-5</code>) for you to confirm — the original wording is kept.</li>
  <li>Set the action: run your <code>daily-briefing</code> workflow, or a direct agent prompt.</li>
  <li>Set delivery: <strong>Telegram → your chat</strong>. Add the IDE notification too if you like — any output can go to any connected channel.</li>
  <li>Close the IDE. The service fires the job on schedule; the briefing lands on your phone; the full run appears in history next time you open Maestro. If your machine was asleep at 8am, the job's catch-up policy (run once / skip) decides what happens on wake — your choice, logged either way.</li>
</ol>

<figure class="shotfig">
  <div class="frame"><img src="/img/shot-rooms.svg" alt="A room bound to a Telegram group, with three agents collaborating"></div>
  <figcaption>Group chats can bind to multi-agent rooms — @mention an agent from Telegram itself.</figcaption>
</figure>

<div class="callout tip"><strong>Budgets still rule.</strong> Remote conversations spend under the same per-profile budgets as everything else. An agent on your phone can never out-spend the limits you set at your desk.</div>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/skills-memory">Skills &amp; memory</a> — the same agent, getting smarter about you.</li>
  <li><a href="/faq">FAQ</a> — pairing security and platform support in detail.</li>
</ul>`,
  },
  {
    slug: "skills-memory",
    title: "Skills & memory",
    description:
      "How Maestro agents remember across sessions and write their own skills — and how you stay in control: memory scopes, cross-session recall, the skill approval queue, and versioned self-improvement.",
    group: "Agent platform",
    card: { k: "Agent platform · 20 min", blurb: "Teach agents once: review and approve self-drafted skills, manage what agents remember, and search everything you've ever discussed." },
    bodyHtml: `
<p class="eyebrow">Agent platform · about 20 minutes <span class="badge badge-dev">In development — Phase 2, learning stage</span></p>
<h1>Skills &amp; memory</h1>
<p class="lede">Two halves of one loop: memory makes agents know <em>you</em>; skills make them keep <em>what they learned</em>. Both are transparent files, and both keep you in charge.</p>

<div class="callout"><strong>This feature is in development.</strong> Everything below is specified in the Maestro blueprint (UR-1300/UR-1400) — including the safety gates — and describes how it will work when the learning stage ships.</div>

<figure class="shotfig">
  <div class="frame"><img src="/img/shot-memory.svg" alt="Memory panel and skills review queue"></div>
  <figcaption>Left: memory entries with edit and history controls. Right: the skills queue, with a draft awaiting your approval.</figcaption>
</figure>

<h2>Memory: what agents remember</h2>
<p>Agents write durable notes as they work — your preferences, project conventions, environment facts — and read them back in every later session. Memory is scoped:</p>
<ul>
  <li><strong>Global</strong> — true everywhere ("prefers TypeScript examples").</li>
  <li><strong>Project</strong> — conventions of one codebase or brand.</li>
  <li><strong>Agent</strong> — one specialist's working notes.</li>
  <li><strong>Profile</strong> — separated per operator when a service has several users.</li>
</ul>
<ol class="steps">
  <li>Tell any agent something worth keeping: <em>"From now on, hero images are 3:2."</em> It stores a project-scope entry.</li>
  <li>Open the <strong>Memory panel</strong>. Every entry is visible, editable, and deletable — no hidden state. Entries are markdown files on disk; version them if you like.</li>
  <li>Restart Maestro and ask for a hero image. The 3:2 preference applies, unprompted.</li>
</ol>
<div class="callout tip"><strong>Curation is automatic but journaled.</strong> On a schedule, agents consolidate duplicates and prune stale entries. Every change lands in a reviewable journal with one-click undo.</div>

<h2>Recall: search everything you've ever discussed</h2>
<ol class="steps">
  <li>Use the recall search — or let agents use it as a tool: <em>"What did we decide about the pricing page last month?"</em></li>
  <li>Maestro full-text-searches all past sessions and runs, then summarizes the matches with links back to the exact sources.</li>
</ol>

<h2>Skills: solve it once</h2>
<p>A skill is a procedural document in the open <a href="https://agentskills.io">SKILL.md</a> format — instructions an agent loads on demand when a matching task appears. Maestro ships a curated library (git operations, diagramming, research, MLOps, media…) and, more interestingly, <strong>agents draft their own</strong>:</p>
<ol class="steps">
  <li>Give an agent a genuinely hard multi-step task. When it succeeds, it writes up the method as a draft skill.</li>
  <li>The draft appears in the <strong>review queue</strong> — inert. Read it like a pull request.</li>
  <li><strong>Approve</strong> to add it to the library, or reject. Nothing an agent writes can activate itself. This gate is deliberate and non-negotiable.</li>
  <li>Next time any agent with that skill enabled faces the task, it loads the skill and completes it in a fraction of the steps.</li>
</ol>

<h2>Self-improvement, as diffs</h2>
<ol class="steps">
  <li>When a skill underperforms, the agent proposes an edit with a rationale — you see it as a versioned diff.</li>
  <li>Accept or reject; roll back any version with one click. Skill history is kept forever.</li>
</ol>

<h2>Sharing skills</h2>
<ul>
  <li>Export any skill as a portable bundle; import ones from the community — the format is agentskills.io-compatible.</li>
  <li>Imports pass a <strong>static safety scan</strong> first: embedded shell commands, network calls, and suspicious payloads are surfaced before you can enable anything. Imported skills start disabled.</li>
</ul>

<h2>Where to go next</h2>
<ul>
  <li><a href="/how-to/telegram-agent">Agents on Telegram</a> — the same memory follows your agent to your phone.</li>
  <li><a href="/features">Features</a> — how skills appear in the dependency graph and run logs.</li>
</ul>`,
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
