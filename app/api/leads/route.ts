import { NextRequest } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

export interface LeadPayload {
  name: string;
  phone: string;
  email?: string;
  location: string;
  serviceType: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, phone, location, serviceType } = body;

  if (!name?.trim() || !phone?.trim() || !location?.trim() || !serviceType?.trim()) {
    return Response.json({ error: "Missing required fields" }, { status: 422 });
  }

  const lead = {
    ...body,
    submittedAt: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
  };

  // Persist locally (works for self-hosted / local dev).
  // On Vercel the filesystem is ephemeral — swap this for a DB/KV call.
  try {
    const dir = join(process.cwd(), "data");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "leads.ndjson"), JSON.stringify(lead) + "\n", "utf8");
  } catch (err) {
    console.error("Lead write failed:", err);
    // Non-fatal: continue so the user still gets a success response
  }

  // Optional: forward to Formspree for email notification.
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
  if (formspreeEndpoint) {
    try {
      await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("Formspree forward failed:", err);
    }
  }

  return Response.json({ ok: true }, { status: 201 });
}
