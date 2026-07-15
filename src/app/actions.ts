"use server";

import { addSubscriber, addSupportMessage } from "@/lib/db";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_MAX = 254; // RFC 5321 maximum address length

// A hidden field real users never fill. Bots that autofill every input trip
// it; we silently accept (no DB write) so they get no signal to adapt.
function isBot(formData: FormData): boolean {
  return String(formData.get("company") ?? "").trim() !== "";
}

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  if (isBot(formData)) {
    return { status: "ok", message: "You're on the list — release notes and stage updates, nothing else." };
  }
  const result = await addSubscriber(email, "site-cta");
  if (!result.ok) return { status: "error", message: result.error };
  return { status: "ok", message: "You're on the list — release notes and stage updates, nothing else." };
}

export type SupportState = { status: "idle" | "ok" | "error"; message: string };

const SUPPORT_TOPICS = new Set([
  "general",
  "installation",
  "bug",
  "models-routing",
  "mrgd",
  "billing",
]);

export async function submitSupport(
  _prev: SupportState,
  formData: FormData,
): Promise<SupportState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const topicRaw = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) return { status: "error", message: "Enter your name." };
  if (name.length > 120) return { status: "error", message: "Please keep your name under 120 characters." };
  if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address so we can reply." };
  }
  if (message.length < 10) return { status: "error", message: "Tell us a bit more — a couple of sentences helps us help you." };
  if (message.length > 5000) return { status: "error", message: "Please keep the message under 5,000 characters." };

  // Silently accept honeypot hits so bots get no signal; no DB write.
  if (isBot(formData)) {
    return {
      status: "ok",
      message: "Message received. We reply to the email you gave us — usually within two business days.",
    };
  }

  // Constrain topic to the known set so a crafted POST can't store arbitrary text.
  const topic = SUPPORT_TOPICS.has(topicRaw) ? topicRaw : "general";

  const result = await addSupportMessage({ name, email, topic, message });
  if (!result.ok) return { status: "error", message: result.error };
  return {
    status: "ok",
    message: "Message received. We reply to the email you gave us — usually within two business days.",
  };
}
