import { NextRequest, NextResponse } from "next/server";
import { sanitizeEmail, sanitizeText, isValidEmail, isBot } from "@/lib/sanitize";
import { addContact, sendNewsletterConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── 1. Honeypot anti-bot
    if (isBot(body._trap)) {
      return NextResponse.json({ success: true });
    }

    // ── 2. Sanitization + validation
    const cleanEmail     = sanitizeEmail(body.email);
    const cleanFirstname = sanitizeText(body.firstname || "", 50);

    if (!isValidEmail(cleanEmail)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    // ── 3. Ajouter contact via lib/email.ts
    const contactResult = await addContact({
      email: cleanEmail,
      firstname: cleanFirstname,
    });

    if (!contactResult.success) {
      if ("error" in contactResult && contactResult.error === "duplicate") {
        return NextResponse.json(
          { error: "Cet email est déjà inscrit à la newsletter." },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: "Erreur ajout contact" }, { status: 500 });
    }

    // ── 4. Email de confirmation via lib/email.ts
    await sendNewsletterConfirmation(cleanEmail);

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}