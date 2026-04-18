import { NextRequest } from "next/server";

const AIRTABLE_BASE = "appitbVZG5ZjPhEIl";
const AIRTABLE_TABLE = "tbl0T1thXXPLrJT0M";

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

  const airtableKey = process.env.AIRTABLE_API_KEY;
  if (!airtableKey) {
    console.error("AIRTABLE_API_KEY not set");
    return Response.json({ error: "Server configuration error" }, { status: 503 });
  }

  const airtableRes = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${airtableKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          Nom: name.trim(),
          Téléphone: phone.trim(),
          ...(body.email?.trim() ? { Email: body.email.trim() } : {}),
          Ville: location.trim(),
          "Type de service": serviceType.trim(),
          Source: "landing-page-rennes",
          Statut: "Nouveau",
          ...(body.message?.trim() ? { Notes: body.message.trim() } : {}),
          "Date soumission": new Date().toISOString(),
        },
      }),
    }
  );

  if (!airtableRes.ok) {
    const err = await airtableRes.text();
    console.error("Airtable error:", err);
    return Response.json({ error: "Failed to store lead" }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 201 });
}
