/**
 * lib/env.ts — Variables d'environnement validées au démarrage
 *
 * Au lieu de process.env.X! éparpillé partout,
 * toutes les vars sont validées ici une seule fois.
 * Si une variable manque → erreur claire au démarrage.
 */

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Variable d'environnement manquante : ${key}\nAjoute-la dans .env.local`);
  }
  return value;
}

export const env = {
  // ── Brevo
  BREVO_API_KEY:      requireEnv("BREVO_API_KEY"),
  BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL ?? "hello@mood2fit.app",
  BREVO_LIST_ID:      Number(process.env.BREVO_LIST_ID ?? 5),

  // ── Upstash Redis (rate limiting)
  UPSTASH_REDIS_REST_URL:   requireEnv("UPSTASH_REDIS_REST_URL"),
  UPSTASH_REDIS_REST_TOKEN: requireEnv("UPSTASH_REDIS_REST_TOKEN"),

  // ── Cron
  CRON_SECRET: process.env.CRON_SECRET ?? "",

  // ── App
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "https://mood2fit.app",
} as const;