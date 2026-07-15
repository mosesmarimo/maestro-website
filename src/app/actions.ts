"use server";

import { addSubscriber } from "@/lib/db";

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
