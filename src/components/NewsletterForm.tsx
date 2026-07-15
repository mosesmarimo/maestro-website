"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions";

const initial: SubscribeState = { status: "idle", message: "" };

export default function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initial);
  return (
    <form action={formAction} className="newsletter" aria-label="Get release updates">
      <div className="newsletter-row">
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          aria-label="Email address"
          disabled={pending || state.status === "ok"}
        />
        <button className="btn btn-primary" type="submit" disabled={pending || state.status === "ok"}>
          {pending ? "Adding…" : state.status === "ok" ? "Subscribed ✓" : "Get release updates"}
        </button>
      </div>
      {state.status !== "idle" && (
        <p className={`newsletter-msg ${state.status}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
