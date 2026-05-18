/**
 * lib/sanitize.ts — Utilitaires de sanitization centralisés
 *
 * Au lieu de dupliquer DOMPurify.sanitize() dans chaque route,
 * on centralise ici toutes les fonctions de nettoyage.
 */

import DOMPurify from "isomorphic-dompurify";

/** Supprime tout HTML — pour les champs texte */
export function sanitizeText(input: unknown, maxLength = 500): string {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }).trim().slice(0, maxLength);
}

/** Normalise un email */
export function sanitizeEmail(input: unknown, maxLength = 100): string {
  if (typeof input !== "string") return "";
  return input.trim().toLowerCase().slice(0, maxLength);
}

/** Vérifie qu'un email est valide */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Vérifie le honeypot anti-bot */
export function isBot(trap: unknown): boolean {
  return typeof trap === "string" && trap.length > 0;
}