---
title: Reference
description: Feature index, shortcuts, types, platform support, data locations, troubleshooting, and glossary.
sidebar_position: 7
---

# Reference

## Complete feature index

| Feature area | Included capabilities | Manual section |
|---|---|---|
| Desktop shell | Native macOS, Windows, and Linux packages; dockable panels; neutral light/dark themes; scaling; command palette; shortcuts; autosave and recovery | [Getting started](getting-started.md) |
| Projects | Multiple workflows, sub-workflows, variables, Git-readable files, dirty state, diff, import/export without secrets | [Create or open a project](getting-started.md#create-or-open-a-project) |
| Model registry | Unlimited models, provider groups, discovery, OAuth where offered, credential pool, capabilities, health, cost, rate limits, tags | [Models and providers](workflows-models-runs.md#models-and-providers) |
| Routing | Task rows, conditions, primary and ordered fallback, named matrices, preview, cheapest eligible, transparent failover | [Task routing](workflows-models-runs.md#task-routing) |
| Workflow canvas | Typed nodes/ports, palette, validation, groups, layout, minimap, undo/redo, dry run, templates, canvas/JSON sync | [Visual workflow authoring](workflows-models-runs.md#visual-workflow-authoring) |
| Orchestration | Full/from-node run, pause/resume/cancel/step, parallel branches, budgets, approvals, retries, failover, artifacts, event history | [Running workflows](workflows-models-runs.md#running-workflows) |
| MRGD | Candidate sampling, sentence/whole-response scoring, four scorer types, presets, multimodal context, inspector, cost, A/B, media best-of-k | [MRGD](workflows-models-runs.md#multimodal-reward-guided-decoding-mrgd) |
| Visualization | Synced tree, dependency graph, impact analysis, live agent badges, animated flow, status list, run Gantt, comparison, PNG/SVG export | [Dependencies and live activity](workflows-models-runs.md#dependencies-and-live-activity) |
| Observability | Run filters/replay, console logs, costs, tokens/media, sessions, model/provider/task breakdowns, alerts, runtime monitor, trace export | [Run history and analytics](workflows-models-runs.md#run-history-replay-and-analytics) |
| Editor and terminal | Highlighted JSON/YAML/Markdown/Python/JS/TS/Rust editing; multiple local or remote terminal sessions | [Editor and terminal](workflows-models-runs.md#built-in-editor-and-terminal) |
| Chat and sessions | Persistent/searchable sessions, streaming, tool traces, interrupt/redirect, `/model`, model attribution, files, cost, CLI | [Chat and sessions](agent-studio.md#chat-and-sessions) |
| Voice | Push-to-talk, file transcription, routed STT/TTS, voice choice, gateway audio, optional configured voice cloning | [Voice](agent-studio.md#voice) |
| Rooms | Multiple independent agents, mentions, broadcast/round-robin/moderator, compression, persistence, channel binding, workflow conversion | [Multi-agent rooms](agent-studio.md#multi-agent-rooms) |
| Memory | Durable facts, scopes, visible access, full-text cross-session recall, source links, curation, journal, opt-in profile modeling | [Persistent memory](agent-studio.md#persistent-memory) |
| Skills | Open format, bundled library, allowlists, human-reviewed drafts, versioned improvement, rollback, safe import/export, workflow use | [Skills](agent-studio.md#skills) |
| Automations and tasks | Natural-language/cron schedules, one-time/recurring/watch/webhook, confirmation, pause/resume/delete/run-now, delivery, catch-up, headless policy | [Automations and tasks](agent-studio.md#automations-and-tasks) |
| Gateway channels | Telegram, Discord, Slack, Matrix, generic bridge, continuity, pairing, permissions, delivery, voice | [Messaging channels](agent-studio.md#messaging-channels-and-gateway) |
| Workspace files | Local/container/SSH/cloud browse, edit, create, rename, upload, download, delete, attach to chat/workflows | [Workspace files](workspace-data-integrations.md#workspace-files) |
| Execution backends | Local, hardened Docker, SSH fingerprint trust, cloud sleep/wake, defaults and overrides, uniform sandbox | [Execution backends](workspace-data-integrations.md#execution-backends) |
| Coding runners | Backend-bound coding agents, Maestro sessions, streamed terminal output, inherited sandbox | [Terminals and coding runners](workspace-data-integrations.md#terminals-and-coding-agent-runners) |
| Web tools | Pluggable search, page extraction, browser action logging, screenshots and vision loop, domain approvals, injection posture | [Web tools](workspace-data-integrations.md#web-search-extraction-and-browser-tools) |
| MCP and extensibility | Local/HTTP MCP, discovery, tool/resource health, allowlists; generic model/API adapters; custom nodes; plugin API | [MCP and extensions](workspace-data-integrations.md#mcp-servers) |
| Data lab | Resumable CSV/JSONL batches, progress/cost, trajectory selection, compression manifest, ShareGPT/raw export, tool conventions, RL stream | [Data lab](workspace-data-integrations.md#data-lab-and-batch-generation) |
| Identity and console | Profiles, accounts, roles, model/credential visibility, budgets, tokens, lockout; restricted operational web console | [Accounts and console](administration-operations.md#accounts-profiles-and-roles) |
| Service and deployment | Always-on service, native lifecycle, hardened Docker, loopback default, TLS-gated LAN, opt-in discovery, health and diagnostics | [Background service](administration-operations.md#background-service) |
| Security, backup, and updates | Vault, redaction, sandbox, zero analytics by default, endpoint audit, signed 4/6/24-hour update checks, backups and restore | [Administration and operations](administration-operations.md) |

## Default shortcuts

Shortcuts follow the operating system and can be changed under **Settings → Shortcuts**.

| Action | macOS | Windows/Linux |
|---|---|---|
| Open command palette | Command-K | Ctrl-K |
| Save workflow | Command-S | Ctrl-S |
| Run current workflow | Command-Enter | Ctrl-Enter |
| Search project components | Option-F | Alt-F |
| New line in chat | Shift-Enter | Shift-Enter |

The Shortcuts screen is the authority for the installed version and reports conflicts after customization.

## Built-in task types

Routing matrices can cover text generation, code generation, embeddings, image generation, image editing, video generation, audio/music generation, speech-to-text, text-to-speech, vision understanding, reranking, classification, moderation, and reward scoring. Provider or extension capabilities may add more rows.

## Workflow port types

| Type | Typical contents |
|---|---|
| `text` | Prompts, messages, extracted text, code-as-text |
| `json` | Structured arguments, records, tool results |
| `image` | Raster image artifact or reference |
| `audio` | Speech, music, or other audio artifact |
| `video` | Video artifact or reference |
| `file` | Backend/project file artifact or reference |
| `embedding` | Numeric vector representation |
| `any` | Explicitly unconstrained input or output |

Use a typed port whenever possible. `any` is useful for adapters but gives validation less information.

## Common agent and run states

| State | Meaning |
|---|---|
| Idle | Configured but not currently executing |
| Thinking | Preparing or generating a response |
| Calling model | Waiting for a model provider |
| Waiting on tool | A tool or backend operation is in progress |
| Waiting on human | Approval or edit is required |
| Blocked | Policy, budget, dependency, or external condition prevents progress |
| Failed | The current path ended with an error |
| Done | Work completed successfully |
| Paused | Execution can be resumed after review |
| Cancelled | A user or policy ended the run |

## Platform and surface support

| Capability | Desktop IDE | Remote console | CLI/service |
|---|:---:|:---:|:---:|
| Workflow and model authoring | Yes | No | Limited operational commands |
| Chat, sessions, rooms, memory | Yes | Yes | Yes |
| Runs, jobs, tasks, analytics | Yes | Yes | Yes |
| Files and terminals | Yes | Yes | Yes |
| Gateway and MCP management | Yes | Yes | Yes |
| Skills review | Yes | Yes | Service-backed |
| Accounts and profiles | Yes | Yes, administrator | Yes, administrator |
| Data-lab authoring | Yes | No | Batch operations where exposed |

Maestro does not include native iOS or Android apps. Paired messaging channels and the responsive web console are its mobile surfaces. The web console intentionally does not author workflows.

## Data and portability

Project folders hold readable authoring files for workflows, routing, presets, variables, and references. Local run databases use transactional storage. The service data root holds operational databases and human-readable/journaled memory plus sessions, skills, profiles, uploads, tasks, and service connection state.

Set a custom service data root before service installation when the default location is unsuitable. For backups, stop the service and copy the complete data root; back up project folders separately. Do not copy the transient service handshake file between hosts.

Portable project/workflow bundles omit credentials. Global and profile memory are omitted by default. Training-data exports are separate artifacts and may contain sensitive prompts, outputs, tool results, images, or recalled memory.

## Troubleshooting

### A model test fails

- Reopen the credential entry and confirm the correct vault reference.
- Verify endpoint, provider adapter, and model identifier.
- Check that the model is enabled and visible to the active profile.
- Distinguish authentication, rate-limit, timeout, provider, and malformed-response errors.
- Test a local model independently if the hosted service is unreachable.

### A node cannot connect

- Compare its output and input port types.
- Insert a transform node for a real conversion.
- Use the Problems panel explanation; avoid changing both ports to `any` merely to bypass validation.

### Routing chose an unexpected model

- Run the routing preview with the same task type, modality, context, and tags.
- Check the active named matrix for this run.
- Review conditions and cheapest-eligible preference.
- Open the event log for the match reason or failover record.

### A run is paused

Look for a human approval, exhausted budget, unavailable backend, sandbox denial, provider rate limit, or headless privileged action. Resolve the condition, then resume; do not start a duplicate run unless you intend to compare results.

### An automation did not run

- Confirm the Maestro service is active.
- Check that the job is enabled and inspect its parsed time zone and next occurrence.
- Review **Run once** versus **Skip** catch-up policy after downtime.
- Verify profile budget, backend health, and channel delivery state.
- Open the job history for approval or policy pauses.

### A messaging user cannot reach an agent

- Confirm the channel adapter is connected.
- Complete pairing for that exact platform identity.
- Check allowed chats, rate limits, and read-only/tool permission.
- For a group, verify its room/session binding.
- For a generic bridge, check WebSocket authentication and TLS.

### Files or shell commands are blocked

This is normally a sandbox decision. Check the selected backend, allowed workspace path, write/shell/network grants, and approval status. Do not broaden the policy globally when a project- or node-level grant is sufficient.

### The remote console is unreachable

- On the same computer, confirm the service is listening on loopback and open its configured address.
- For another device, confirm explicit network binding, TLS certificate/key, firewall access, and the correct profile account.
- Discovery does not enable remote binding; it only advertises an already valid service.
- Use the health endpoint or diagnostics command to separate network failure from sign-in failure.

### An update is not offered

- Check the current channel and version under **Settings → Data & updates**.
- Choose **Check now** and inspect the displayed error.
- Confirm internet and update-feed access.
- Alpha, beta, and stable are separate feeds; a release must exist on the installed channel.
- Versions before 1.5 require one manual installer upgrade.

### An update download fails

Retry from **Settings → Data & updates**. Maestro will not install an artifact with a missing or invalid signature. If the current project has unsaved state, save or export it before using a normal installer as a fallback.

## Glossary

| Term | Meaning |
|---|---|
| Agent | A configured AI participant with a role, model/route, tools, skills, budgets, and autonomy policy. |
| Artifact | A file-like run output such as an image, report, audio clip, screenshot, or dataset. |
| Backend | The local, container, SSH, or cloud environment where tools execute. |
| Channel | A connected external messaging platform or generic bridge. |
| Credential pool | Vault-backed secrets that can serve several models or services without copying values into configuration. |
| Event log | The replayable record of a run or session, including output, tools, routes, approvals, costs, and scores. |
| Gateway | The always-on service component that connects external messaging platforms to Maestro sessions and rooms. |
| Matrix | A named set of task-routing rules with primary and fallback models. |
| MCP | Model Context Protocol; a standard way to attach external tool/resource servers. |
| MRGD | Multimodal Reward-Guided Decoding; candidate generation and reward-based selection during inference. |
| Profile | An isolated operational space containing a user's sessions, rooms, jobs, memory, skills, tools, and budgets. |
| Project | A portable folder of workflows, routing, presets, variables, references, and related authoring assets. |
| Room | A persistent shared conversation between a user and multiple independently configured agents. |
| Route | The task-type rule and eligibility decision that chooses a model, including fallbacks. |
| Session | A persistent conversation with its source, messages, tools, files, token use, and cost. |
| Skill | An open reusable instruction package, optionally including scripts and resources, loaded on demand. |
| Trajectory | A recorded sequence of prompts, messages, tool calls, outputs, and optional rewards used for evaluation or training. |
| Workflow | A typed visual graph of inputs, agents, models, tools, control flow, approvals, quality steps, and outputs. |

## Further technical documentation

This manual is user-facing. Operators and contributors can continue with the [deployment guide](../deployment.md), [security checklist](../security-checklist.md), [software update pipeline](../software-updates.md), [product blueprint](../01-Maestro-IDE-Blueprint.md), and [system specification](../02-Maestro-IDE-System-Specification.md).
