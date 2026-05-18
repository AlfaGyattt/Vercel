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

function getEmailHtml(): string {
  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue dans la communauté Mood2Fit</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f0eff4;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0eff4;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <!-- WRAPPER -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;background:#ffffff;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#000000;padding:24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#ffffff !important;letter-spacing:-0.5px;-webkit-text-fill-color:#ffffff;">Mood</span><span style="font-family:Arial,Helvetica,sans-serif;font-size:20px;font-weight:700;color:#f72585 !important;-webkit-text-fill-color:#f72585;">2Fit</span>
                  </td>
                  <td align="right">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#f72585;letter-spacing:2px;text-transform:uppercase;">
                      Newsletter
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO -->
          <tr>
            <td style="background-color:#000000;padding:0 24px 40px;border-bottom:3px solid #f72585;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 20px 0;">
                Bienvenue
              </p>
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:38px;font-weight:900;color:#ffffff;line-height:1.05;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:-0.5px;">
                Tu es dans
              </p>
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:38px;font-weight:900;color:#f72585;line-height:1.05;margin:0 0 24px 0;text-transform:uppercase;letter-spacing:-0.5px;">
                la boucle.
              </p>
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.6;margin:0;max-width:400px;">
                Bienvenue dans la communauté Mood2Fit. Chaque mois, le meilleur de l'actu sport, des conseils concrets et les événements près de chez toi.
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 24px;">

              <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:0 0 20px 0;">
                Ce que tu vas recevoir
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #eeeeee;">
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #eeeeee;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="12" style="vertical-align:top;padding-top:5px;">
                          <div style="width:6px;height:6px;border-radius:50%;background-color:#f72585;"></div>
                        </td>
                        <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.5;">
                          <strong style="color:#000000;">Les tendances sport du mois.</strong> Street workout, fitness, callisthénie. Ce qui monte, ce qui marche.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #eeeeee;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="12" style="vertical-align:top;padding-top:5px;">
                          <div style="width:6px;height:6px;border-radius:50%;background-color:#f72585;"></div>
                        </td>
                        <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.5;">
                          <strong style="color:#000000;">Des conseils actionnables.</strong> Nutrition, récupération, mental. Du concret, pas du remplissage.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #eeeeee;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="12" style="vertical-align:top;padding-top:5px;">
                          <div style="width:6px;height:6px;border-radius:50%;background-color:#f72585;"></div>
                        </td>
                        <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.5;">
                          <strong style="color:#000000;">Les événements près de chez toi.</strong> Sessions collectives, challenges, meetups communautaires.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #eeeeee;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="12" style="vertical-align:top;padding-top:5px;">
                          <div style="width:6px;height:6px;border-radius:50%;background-color:#f72585;"></div>
                        </td>
                        <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.5;">
                          <strong style="color:#000000;">Les histoires de la communauté.</strong> Duos formés, objectifs atteints, parcours inspirants.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #eeeeee;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="12" style="vertical-align:top;padding-top:5px;">
                          <div style="width:6px;height:6px;border-radius:50%;background-color:#f72585;"></div>
                        </td>
                        <td style="padding-left:12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#555555;line-height:1.5;">
                          <strong style="color:#000000;">L'accès beta en avant-première</strong> quand l'app sera disponible sur les stores.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA BLOCK -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td style="background-color:#f72585;border-radius:14px;padding:36px 32px;text-align:center;">
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:900;color:#ffffff;text-transform:uppercase;letter-spacing:-0.5px;margin:0 0 8px 0;line-height:1.1;">
                      Rejoins<br/>la commu.
                    </p>
                    <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:rgba(255,255,255,0.8);margin:0 0 24px 0;line-height:1.5;">
                      Sois parmi les premiers à rejoindre la communauté.<br/>L'app arrive bientôt.
                    </p>
                    <a href="https://mood2fit.app" style="display:inline-block;background-color:#ffffff;color:#f72585;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:100px;">
                      Ouvrir le site
                    </a>
                  </td>
                </tr>
              </table>

              <!-- INFOS -->
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;color:#f72585;letter-spacing:3px;text-transform:uppercase;margin:36px 0 16px 0;">
                En bref
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="25%" style="text-align:center;background-color:#f7f7f7;border-radius:10px;padding:16px 8px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="font-size:10px;font-weight:700;color:#999999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Fréquence</p>
                    <p style="font-size:13px;font-weight:700;color:#000000;margin:0;">1/mois</p>
                  </td>
                  <td width="2%"></td>
                  <td width="25%" style="text-align:center;background-color:#f7f7f7;border-radius:10px;padding:16px 8px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="font-size:10px;font-weight:700;color:#999999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Envoi</p>
                    <p style="font-size:13px;font-weight:700;color:#000000;margin:0;">1er lundi</p>
                  </td>
                  <td width="2%"></td>
                  <td width="25%" style="text-align:center;background-color:#f7f7f7;border-radius:10px;padding:16px 8px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="font-size:10px;font-weight:700;color:#999999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Spam</p>
                    <p style="font-size:13px;font-weight:700;color:#000000;margin:0;">Zéro.</p>
                  </td>
                  <td width="2%"></td>
                  <td width="25%" style="text-align:center;background-color:#f7f7f7;border-radius:10px;padding:16px 8px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="font-size:10px;font-weight:700;color:#999999;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 6px 0;">Données</p>
                    <p style="font-size:13px;font-weight:700;color:#000000;margin:0;">Privées.</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#000000;padding:28px 40px;text-align:center;">
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;color:#ffffff;margin:0 0 16px 0;">
                Mood<span style="color:#f72585;">2Fit</span>
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                <tr>
                  <td align="center">
                    <a href="https://mood2fit.app" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;margin:0 12px;">Site web</a>
                    <a href="https://instagram.com/mood2fit" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;margin:0 12px;">Instagram</a>
                    <a href="mailto:hello@mood2fit.app" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.4);text-decoration:none;margin:0 12px;">Contact</a>
                  </td>
                </tr>
              </table>
              <p style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.25);line-height:1.6;margin:0;">
                Tu reçois cet email car tu t'es inscrit sur mood2fit.app.<br/>
                <a href="{{unsubscribe}}" style="color:rgba(255,255,255,0.4);">Me désabonner</a> En un clic, sans question.
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