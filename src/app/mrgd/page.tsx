import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Multimodal Reward-Guided Decoding (MRGD), explained",
  description:
    "What is multimodal reward-guided decoding (MRGD)? A plain-language explainer of the ICCV 2025 technique — sample k candidates, score them with reward models, keep the best — and how Maestro Studio implements it as a runtime quality dial for AI agents.",
  keywords: [
    "multimodal reward-guided decoding",
    "MRGD",
    "reward-guided decoding",
    "reward-guided generation",
    "inference-time alignment",
    "best-of-n sampling",
    "rejection sampling",
    "reward models",
    "hallucination reduction",
    "LLM decoding strategies",
    "segment-level guidance",
  ],
  alternates: { canonical: "/mrgd" },
  openGraph: {
    title: "Multimodal Reward-Guided Decoding (MRGD), explained",
    description:
      "Sample k candidate continuations every sentence, score each with weighted reward models, keep the best. The ICCV 2025 technique behind Maestro Studio's quality dial — explained plainly.",
    url: "https://maestroide.com/mrgd",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TechArticle",
      headline: "Multimodal Reward-Guided Decoding (MRGD), explained",
      description:
        "A plain-language explainer of multimodal reward-guided decoding (MRGD): sampling k candidate continuations per sentence, scoring them with weighted reward models, and keeping the best — with results from the ICCV 2025 paper and how Maestro Studio implements it.",
      author: { "@type": "Organization", name: "Maestro Studio", url: "https://maestroide.com" },
      publisher: { "@type": "Organization", name: "Maestro Studio", url: "https://maestroide.com" },
      mainEntityOfPage: "https://maestroide.com/mrgd",
      citation: {
        "@type": "ScholarlyArticle",
        name: "Controlling Multimodal LLMs via Reward-guided Decoding",
        author: "Mañas et al.",
        url: "https://arxiv.org/abs/2508.11616",
      },
    },
    {
      "@type": "DefinedTerm",
      name: "Multimodal Reward-Guided Decoding (MRGD)",
      description:
        "An inference-time technique for controlling multimodal large language models: at each step the model samples k candidate continuations, each candidate is scored by a weighted combination of reward models conditioned on the multimodal input (for example an image), and the highest-scoring candidate is kept. The weighting is adjustable at run time, trading precision against recall without retraining the base model.",
      url: "https://maestroide.com/mrgd",
    },
  ],
};

export default function MrgdPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Concept explainer · ICCV 2025</p>
          <h1>Multimodal Reward-Guided Decoding (MRGD), explained</h1>
          <p className="lede">
            MRGD is an inference-time technique for controlling what a multimodal AI model
            generates: instead of accepting the model&rsquo;s first answer, you sample several
            candidates, score each against reward models that can see the input, and keep the best
            — sentence by sentence. No retraining. No fine-tuning. A dial you can turn at run time.
          </p>
        </div>
      </header>

      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap" style={{ maxWidth: 820 }}>
          <h2 style={{ marginBottom: 14 }}>The problem it solves</h2>
          <p style={{ color: "var(--muted)", marginBottom: 14 }}>
            Multimodal language models hallucinate: ask one to describe an image and it may name
            objects that are not there. The classic fixes sit at two extremes. Training-time
            alignment (RLHF, DPO) works but is frozen — every behavior change means retraining.
            Prompting is adjustable but coarse. MRGD occupies the useful middle: it steers the
            model <em>while it generates</em>, using reward models as judges, and exposes a single
            weight <code>w</code> that trades precision against recall per request.
          </p>

          <h2 style={{ marginBottom: 14 }}>How it works</h2>
          <pre>
            <code>{`y ← ""                                    # the response so far
while y has no end-of-sequence token:
    sample k candidate continuations      # each ≈ one sentence
    score each candidate:
        s = w · r_hal + (1 − w) · r_rec   # weighted reward mix
    y ← y + argmax(s)                     # keep the best candidate`}</code>
          </pre>
          <ul style={{ color: "var(--muted)", margin: "0 0 16px 22px" }}>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: "var(--ivory)" }}>r_hal</strong> — a learned reward model
              that sees the image and penalizes text not grounded in it (in the paper: a
              PaliGemma-3B scorer trained on ~40k preference pairs in about nine minutes on 8×H100).
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: "var(--ivory)" }}>r_rec</strong> — a programmatic recall
              scorer built from off-the-shelf parts (open-vocabulary object detection + embedding
              matching); no training at all.
            </li>
            <li style={{ marginBottom: 8 }}>
              <strong style={{ color: "var(--ivory)" }}>w ∈ [0, 1]</strong> — the runtime dial:
              1.0 maximizes grounding (precision), 0.0 maximizes coverage (recall).
            </li>
          </ul>
          <p style={{ color: "var(--muted)", marginBottom: 14 }}>
            Scoring happens every <code>T</code> sentences (T=1 by default). Set T to the whole
            response and MRGD degenerates into plain best-of-k rejection sampling — which makes
            MRGD a strict generalization of best-of-n, sitting between token-level guided decoding
            (ARGS, controlled decoding) and whole-response reranking.
          </p>

          <h2 style={{ marginBottom: 14 }}>What the paper measured</h2>
          <p style={{ color: "var(--muted)", marginBottom: 10 }}>
            From <a href="https://arxiv.org/abs/2508.11616">&ldquo;Controlling Multimodal LLMs via
            Reward-guided Decoding&rdquo;</a> (Mañas, D&rsquo;Oro, Sinha, Romero-Soriano, Drozdzal,
            Agrawal — Mila / Meta FAIR, ICCV 2025), evaluating LLaVA-1.5, Llama-3.2-Vision, and
            SmolVLM-2 on COCO and AMBER:
          </p>
          <ul style={{ color: "var(--muted)", margin: "0 0 16px 22px" }}>
            <li style={{ marginBottom: 8 }}>~70% fewer hallucinated objects than greedy decoding (CHAIRi 15.05% → 4.53% on COCO at w=1.0).</li>
            <li style={{ marginBottom: 8 }}>Sentence-level guidance with k=5 candidates beat best-of-30 whole-response sampling — over 6× more sample-efficient than rejection sampling.</li>
            <li style={{ marginBottom: 8 }}>Latency grows sublinearly in k thanks to batched candidate generation (k=30 ≈ 11× wall clock, not 30×).</li>
            <li style={{ marginBottom: 8 }}>It stacks: applied on top of a DPO-aligned model, hallucination still dropped further.</li>
          </ul>

          <h2 style={{ marginBottom: 14 }}>MRGD in Maestro Studio</h2>
          <p style={{ color: "var(--muted)", marginBottom: 14 }}>
            <Link href="/">Maestro Studio</Link> implements MRGD as a per-node decoding mode in its
            agent orchestration engine, generalized to any number of weighted scorers: learned
            reward endpoints, programmatic scorers, LLM-as-judge rubrics, or your own scripts. You
            set k, T, and the weights in the inspector; presets cover the precision↔recall
            spectrum; a live candidate inspector shows every round, every score, every selection;
            and the ~k× cost is estimated before you run. The same idea extends to media as
            best-of-k selection over generated images and audio.
          </p>
          <div className="hero-cta" style={{ marginBottom: 8 }}>
            <Link className="btn btn-primary" href="/how-to/mrgd-tuning">Tune MRGD in Maestro — the guide</Link>
            <Link className="btn btn-ghost" href="/features">See all features</Link>
          </div>

          <h2 style={{ marginTop: 40, marginBottom: 14 }}>Related terms</h2>
          <p style={{ color: "var(--muted)" }}>
            Reward-guided text generation · inference-time alignment · decoding-time alignment ·
            best-of-n / rejection sampling · segment-level guidance · process reward models ·
            hallucination mitigation for vision-language models · CHAIR metric · guided decoding
            (ARGS, RAD, controlled decoding). MRGD is the segment-level member of this family, and
            the first built on multimodal reward models.
          </p>
        </div>
      </section>
    </>
  );
}
