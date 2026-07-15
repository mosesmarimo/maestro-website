"use client";

import { useActionState } from "react";
import { submitSupport, type SupportState } from "@/app/actions";

const initial: SupportState = { status: "idle", message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitSupport, initial);
  const done = state.status === "ok";
  return (
    <form action={formAction} className="contact-form" aria-label="Contact support">
      <div className="cf-row">
        <label>
          Name
          <input type="text" name="name" required minLength={2} placeholder="Your name" disabled={pending || done} />
        </label>
        <label>
          Email
          <input type="email" name="email" required placeholder="you@example.com" disabled={pending || done} />
        </label>
      </div>
      <label>
        Topic
        <select name="topic" defaultValue="general" disabled={pending || done}>
          <option value="general">General question</option>
          <option value="installation">Installation problem</option>
          <option value="bug">Bug report</option>
          <option value="models-routing">Models & routing</option>
          <option value="mrgd">MRGD & reward scorers</option>
          <option value="billing">Licensing</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={7}
          placeholder="What happened, what you expected, and — for bugs — your OS and Maestro version."
          disabled={pending || done}
        />
      </label>
      <button className="btn btn-primary" type="submit" disabled={pending || done}>
        {pending ? "Sending…" : done ? "Sent ✓" : "Send message"}
      </button>
      {state.status !== "idle" && (
        <p className={`newsletter-msg ${state.status}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}
