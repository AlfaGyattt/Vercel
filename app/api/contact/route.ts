import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import DOMPurify from "isomorphic-dompurify";

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || "alfayedmsa45@hotmail.com";
const FROM_NAME = "Mood2Fit";
const TO_EMAIL = "alfayedmsa45@hotmail.com";

// ── Rate limiter : 5 messages max par IP toutes les 10 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "10 m"),
  analytics: true,
});

export async function POST(req: NextRequest) {
  try {

    // ── 1. Rate limiting par IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const { success } = await ratelimit.limit(`contact:${ip}`);
    if (!success) {
      return NextResponse.json(
        { error: "Trop de messages envoyés. Réessaie dans quelques minutes." },
        { status: 429 }
      );
    }

    // ── 2. Lecture body
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // ── 3. Honeypot anti-bot (champ _trap caché dans le formulaire)
    if (body._trap) {
      return NextResponse.json({ success: true }); // Bot → on fait semblant
    }

    // ── 4. Sanitization XSS
    const cleanName    = DOMPurify.sanitize(name,    { ALLOWED_TAGS: [] }).trim().slice(0, 80);
    const cleanEmail   = email.trim().toLowerCase().slice(0, 100);
    const cleanSubject = DOMPurify.sanitize(subject, { ALLOWED_TAGS: [] }).trim().slice(0, 120);
    const cleanMessage = DOMPurify.sanitize(message, { ALLOWED_TAGS: [] }).trim().slice(0, 2000);

    // ── 5. Envoi Brevo (ton code exact)
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: TO_EMAIL }],
        replyTo: { email: cleanEmail, name: cleanName },
        subject: `[Contact] ${cleanSubject} — ${cleanName}`,
        htmlContent: getEmailHtml({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
        }),
      }),
    });

    const text = await res.text();

    if (!res.ok) {
      return NextResponse.json({ error: "Erreur envoi email", detail: text }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

function getEmailHtml({ name, email, subject, message }: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#f0eff4;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff4;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;border-radius:16px;overflow:hidden;background:#ffffff;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#000000;padding:24px;">
              <span style="font-size:20px;font-weight:700;color:#ffffff;">Mood</span>
              <span style="font-size:20px;font-weight:700;color:#f72585;">2Fit</span>
              <span style="float:right;font-size:11px;font-weight:700;color:#f72585;letter-spacing:2px;text-transform:uppercase;">Nouveau message</span>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="background-color:#000000;padding:0 24px 40px;border-bottom:3px solid #f72585;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 12px 0;">Contact</p>
              <p style="font-size:32px;font-weight:900;color:#ffffff;line-height:1.05;margin:0 0 4px 0;text-transform:uppercase;">Message reçu.</p>
              <p style="font-size:15px;color:rgba(255,255,255,0.5);margin:8px 0 0 0;">
                Tu as reçu un nouveau message via le formulaire de contact.
              </p>
            </td>
          </tr>

          <!-- INFOS EXPÉDITEUR -->
          <tr>
            <td style="background:#fff;padding:28px 24px 0;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">Expéditeur</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #eee;">
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;width:100px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Nom</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;color:#000;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Email</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;">
                    <a href="mailto:${email}" style="color:#f72585;text-decoration:none;font-weight:600;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:13px;color:#999;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Sujet</td>
                  <td style="padding:14px 0;border-bottom:1px solid #eee;font-size:14px;color:#000;font-weight:600;">${subject}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="background:#fff;padding:24px;">
              <p style="font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px 0;">Message</p>
              <div style="background:#f7f7f7;border-radius:12px;padding:20px 24px;border-left:4px solid #f72585;">
                <p style="font-size:15px;color:#333;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- CTA répondre -->
          <tr>
            <td style="background:#fff;padding:0 24px 32px;text-align:center;">
              <a href="mailto:${email}?subject=Re: ${subject}"
                style="display:inline-block;background:#f72585;color:#fff;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:100px;">
                Répondre à ${name}
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#000;padding:24px;text-align:center;">
              <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">
                Message reçu via le formulaire de contact — mood2fit.app
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}