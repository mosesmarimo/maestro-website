"use server";

import { addSubscriber, addSupportMessage } from "@/lib/db";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }
  const result = await addSubscriber(email, "site-cta");
  if (!result.ok) return { status: "error", message: result.error };
  return { status: "ok", message: "You're on the list — release notes and stage updates, nothing else." };
}

export type SupportState = { status: "idle" | "ok" | "error"; message: string };

export async function submitSupport(
  _prev: SupportState,
  formData: FormData,
): Promise<SupportState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (name.length < 2) return { status: "error", message: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Enter a valid email address so we can reply." };
  if (message.length < 10) return { status: "error", message: "Tell us a bit more — a couple of sentences helps us help you." };
  if (message.length > 5000) return { status: "error", message: "Please keep the message under 5,000 characters." };

  const result = await addSupportMessage({ name, email, topic: topic || "general", message });
  if (!result.ok) return { status: "error", message: result.error };
  return {
    status: "ok",
    message: "Message received. We reply to the email you gave us — usually within two business days.",
  };
}
