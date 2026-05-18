/**
 * lib/email.ts — Couche service email (Brevo)
 *
 * Si on change de provider email demain (Resend, Sendgrid...),
 * on ne modifie que ce fichier — les routes API ne changent pas.
 */

import { env } from "./env";

const BREVO_URL = "https://api.brevo.com/v3";

const headers = {
  "Content-Type": "application/json",
  "api-key": env.BREVO_API_KEY,
};

// ── Types ────────────────────────────────────────────────────

interface EmailRecipient {
  email: string;
  name?: string;
}

interface SendEmailOptions {
  to: EmailRecipient[];
  subject?: string;
  htmlContent?: string;
  templateId?: number;
  replyTo?: EmailRecipient;
}

interface AddContactOptions {
  email: string;
  firstname?: string;
  listIds?: number[];
}

// ── Réponses ─────────────────────────────────────────────────

export type EmailResult =
  | { success: true }
  | { success: false; error: string; status: number };

// ── Service ──────────────────────────────────────────────────

/**
 * Envoie un email transactionnel via Brevo
 */
export async function sendEmail(options: SendEmailOptions): Promise<EmailResult> {
  try {
    const res = await fetch(`${BREVO_URL}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { name: "Mood2Fit", email: env.BREVO_SENDER_EMAIL },
        ...options,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo sendEmail error:", res.status, text);
      return { success: false, error: "Erreur envoi email", status: res.status };
    }

    return { success: true };
  } catch (err) {
    console.error("Brevo sendEmail exception:", err);
    return { success: false, error: "Erreur réseau", status: 500 };
  }
}

/**
 * Ajoute un contact à une liste Brevo
 * Retourne "duplicate" si l'email est déjà inscrit
 */
export async function addContact(
  options: AddContactOptions
): Promise<EmailResult | { success: false; error: "duplicate"; status: 409 }> {
  try {
    const res = await fetch(`${BREVO_URL}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: options.email,
        attributes: { FIRSTNAME: options.firstname ?? "" },
        listIds: options.listIds ?? [env.BREVO_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (res.status === 400) {
      const json = await res.json();
      if (json.code === "duplicate_parameter") {
        return { success: false, error: "duplicate", status: 409 };
      }
    }

    if (!res.ok) {
      const text = await res.text();
      console.error("Brevo addContact error:", res.status, text);
      return { success: false, error: "Erreur ajout contact", status: res.status };
    }

    return { success: true };
  } catch (err) {
    console.error("Brevo addContact exception:", err);
    return { success: false, error: "Erreur réseau", status: 500 };
  }
}

/**
 * Envoie l'email de confirmation newsletter (template #9)
 */
export async function sendNewsletterConfirmation(email: string): Promise<EmailResult> {
  return sendEmail({
    to: [{ email }],
    templateId: 9,
  });
}