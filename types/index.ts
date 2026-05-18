/**
 * types/index.ts — Types centralisés Mood2Fit
 *
 * Un seul endroit pour tous les types partagés.
 * Importe depuis n'importe quelle page ou composant :
 * import type { Article } from "@/types";
 */

// ── Articles ─────────────────────────────────────────────────

export type ArticleLang = "FR" | "ANG";

export type ArticleCategory =
  | "humeur"
  | "equipe"
  | "tendances"
  | "sante"
  | "nutrition"
  | "evenements";

export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
  publishedAt_fr: string;
  read: string;
  category: ArticleCategory;
  lang?: ArticleLang;
  query_used?: string;
}

export interface ArticlesData {
  generatedAt: string;
  articles: Record<ArticleCategory, Article[]>;
}

// ── Newsletter ────────────────────────────────────────────────

export interface NewsletterFormData {
  email: string;
}

// ── Contact ───────────────────────────────────────────────────

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  _trap?: string; // honeypot anti-bot
}

// ── API Responses ─────────────────────────────────────────────

export interface ApiSuccess {
  success: true;
}

export interface ApiError {
  error: string;
}

export type ApiResponse = ApiSuccess | ApiError;