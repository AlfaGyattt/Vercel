import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || "hello@mood2fit.app";
const FROM_NAME = "Mood2Fit";

// ── Rate limiter : 3 inscriptions max par IP toutes les 60 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 m"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {

    // ── 1. Rate limiting par IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const { success } = await ratelimit.limit(`newsletter:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessaie dans une heure." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { email, firstname } = body;

    // ── 2. Honeypot anti-bot
    if (body._trap) {
      return NextResponse.json({ success: true }); // Bot → on fait semblant
    }

    // ── 3. Validation + sanitization
    const cleanEmail = email?.trim().toLowerCase().slice(0, 100) || "";
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }
    const cleanFirstname = (firstname || "").trim().slice(0, 50);

    // 1. Ajouter le contact à la liste Brevo
    const contactRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: cleanEmail,
        attributes: { FIRSTNAME: cleanFirstname },
        listIds: [Number(process.env.BREVO_LIST_ID || 5)],
        updateEnabled: true,
      }),
    });
    const contactText = await contactRes.text();

    // ── 4. Gérer "email déjà inscrit"
    if (contactRes.status === 400) {
      const contactJson = JSON.parse(contactText);
      if (contactJson.code === "duplicate_parameter") {
        return NextResponse.json(
          { error: "Cet email est déjà inscrit à la newsletter." },
          { status: 409 }
        );
      }
    }

    // 2. Envoyer l'email de confirmation via template Brevo #9
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: cleanEmail }],
        templateId: 9, // ← Template "Inscription Newsletter" Brevo
      }),
    });

    const emailText = await emailRes.text();

    if (!emailRes.ok) {
      return NextResponse.json({ error: "Erreur envoi email", detail: emailText }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}