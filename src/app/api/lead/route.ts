import { NextResponse } from "next/server";
import { findArea } from "@/data/areas";
import { getTier } from "@/lib/pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  postcode?: string;
  projectType: string;
  budget: string;
  message?: string;
  areaSlug: string;
  source?: string;
  // Honeypot — bots fill this. Real users never see the field.
  company?: string;
  // Time the form was rendered (ms epoch). Submissions <1.5s are likely bots.
  renderedAt?: number;
}

const VALID_PROJECT_TYPES = new Set([
  "extension",
  "loft",
  "refurbishment",
  "kitchen-bathroom",
  "other",
]);

const VALID_BUDGETS = new Set([
  "under-50k",
  "50-100k",
  "100-250k",
  "250-500k",
  "500k-plus",
  "unsure",
]);

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isUkPhone(v: string) {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13;
}

export async function POST(req: Request) {
  let payload: LeadPayload;
  try {
    payload = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot — silently accept and drop.
  if (payload.company && payload.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // Time gate.
  if (payload.renderedAt && Date.now() - payload.renderedAt < 1500) {
    return NextResponse.json({ ok: true });
  }

  if (
    !payload.name ||
    !payload.email ||
    !isEmail(payload.email) ||
    !payload.phone ||
    !isUkPhone(payload.phone) ||
    !payload.projectType ||
    !VALID_PROJECT_TYPES.has(payload.projectType) ||
    !payload.budget ||
    !VALID_BUDGETS.has(payload.budget) ||
    !payload.areaSlug
  ) {
    return NextResponse.json({ ok: false, error: "validation_failed" }, { status: 400 });
  }

  const area = findArea(payload.areaSlug);
  if (!area) {
    return NextResponse.json({ ok: false, error: "unknown_area" }, { status: 400 });
  }

  const enriched = {
    ...payload,
    areaName: area.name,
    areaTier: getTier(area.slug),
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    referer: req.headers.get("referer") ?? undefined,
    // Vercel forwards the visitor IP here.
    ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? undefined,
  };

  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(process.env.LEAD_WEBHOOK_SECRET
            ? { "x-2vp-secret": process.env.LEAD_WEBHOOK_SECRET }
            : {}),
        },
        body: JSON.stringify(enriched),
      });
      if (!res.ok) {
        console.error("[lead] webhook returned", res.status);
        return NextResponse.json(
          { ok: false, error: "webhook_failed" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[lead] webhook error", err);
      return NextResponse.json(
        { ok: false, error: "webhook_error" },
        { status: 502 },
      );
    }
  } else {
    // No webhook configured — log and accept so dev/staging works.
    console.log("[lead]", JSON.stringify(enriched));
  }

  return NextResponse.json({ ok: true });
}
