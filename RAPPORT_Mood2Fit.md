56# Rapport d’architecture — Mood2Fit (Next.js 14)

> **Note** : pour produire exactement la *carte des dépendances fichier-par-fichier avec numéros de ligne* et détecter strictement *imports/exports/props jamais utilisés* avec preuve, il faut lire l’intégralité des fichiers. La session a été interrompue et plusieurs lectures ont échoué à cause d’erreurs d’accès/commande. Ce rapport contient donc :
> - un **résumé fiable** des patterns d’architecture observés,
> - les **problèmes critiques** déjà identifiés avec preuves via fichiers lus,
> - les **zones à vérifier** pour compléter 100% des items.

---

## A) Cartographie (haut niveau)

### 1) Dossiers et rôle
- `app/`
  - Pages route (`app/page.tsx`, `app/*/page.tsx`)
  - Pages écran par route (ex: `app/contact/ContactPage.tsx`)
  - UI de fallback (`app/not-found.tsx`, `app/global-error.tsx`)
  - API Routes (`app/api/contact/route.ts`, `app/api/newsletter/route.ts`, `app/api/sentry-example-api/route.ts`)
- `components/`
  - Composants UI marketing (Navbar/Footer/Hero sections)
  - Composants “home” sous `components/home/*`
- `data/`
  - `data/content.ts` = source de données statiques typées (hero, nav, footer, CTA, etc.)
- `lib/`
  - `lib/utils.ts` = helpers (ex: `cn`, animations)
  - `lib/env.ts` = chargement environnement
  - `lib/sanitize.ts`, `lib/email.ts` (utilitaires email)
- `types/`
  - `types/index.ts` = types centralisés.

### 2) Composants fortement couplés à la donnée
- `Navbar` lit `navContent` (`@/data/content`).
- Sections marketing lisent majoritairement `@/data/content`.

---

## B) Problèmes détectés (avec fichiers lus)

### 1) Duplication critique : 2 implémentations “Newsletter”
- **Fichiers**
  - `components/Newsletter.tsx`
  - `components/home/HomeNewsletter.tsx` (déjà connu comme autre implémentation car le projet en a 2)
- **Constat**
  - Deux composants différents réalisent un formulaire newsletter (Zod + react-hook-form + POST `/api/newsletter`) avec UI/flow distinct.
- **Sévérité : 🔴 critique**
- **Solution recommandée**
  - Garder une seule implémentation (par ex. `HomeNewsletter`) et supprimer l’autre si non utilisée.
  - Extraire un sous-composant partagé :
    - schéma Zod + types
    - hook `useNewsletterForm()`
    - bouton/état succès

**Exemple** (structure) :
```ts
// lib/newsletter/schema.ts
export const newsletterSchema = z.object({
  firstname: z.string().min(2).max(50).trim(),
  email: z.string().email().max(100),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
```
```tsx
// components/shared/NewsletterForm.tsx
'use client'
export function NewsletterForm({ variant }: { variant: 'home'|'generic' }) {
  // ... Zod + RHF + POST /api/newsletter
  // UI modulable via props/variant
}
```

---

### 2) Duplication critique : 2 implémentations “Hero” + “StoreButtons”
- **Fichiers**
  - `components/Hero.tsx` (hero vidéo, store buttons via `heroContent`, mockup téléphone)
  - `components/home/HomeHero.tsx` (hero home, structure proche)
  - aussi `components/CtaDownload.tsx` (store buttons via `ctaContent`)
  - pages type `app/*/…` réimplémentent des CTA/store buttons (au moins `CommunautePage`, `FonctionnalitesPage`, `AProposPage`)
- **Sévérité : 🔴 critique**
- **Symptômes**
  - Boutons store iOS/Android réécrits sous différentes formes.
  - Textes, gradients et sections “CTA final” apparaissent plusieurs fois.
- **Solution recommandée**
  - Créer :
    1) `components/shared/StoreButtons.tsx`
    2) `components/shared/HeroSection.tsx` (ou `HeroMarketingSection`) avec variantes (video/background/mockup)
    3) `components/shared/CtaSection.tsx`

**Exemple** `StoreButtons` :
```tsx
'use client'
import Link from 'next/link'
import { Apple, Play } from 'lucide-react'
import type { StoreButton } from '@/types' // ou depuis data/content

export function StoreButtons({ buttons }: { buttons: StoreButton[] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {buttons.map((btn) => {
        const Icon = btn.platform === 'ios' ? Apple : Play
        return (
          <Link key={btn.platform} href={btn.href} className="...">
            <Icon size={22} />
            <div>
              <p>{btn.sublabel}</p>
              <p>{btn.label}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
```

---

### 3) Composants marqués `use client` alors qu’ils n’utilisent pas de hooks
- **Fichiers à vérifier** (patterns observés)
  - de nombreux composants de UI sont `"use client"`.
  - Exemple : `components/home/HomeSocial.tsx` utilise `motion` mais pas de hooks, donc il pourrait éventuellement être server-friendly *selon framer-motion* (en pratique `motion` impose souvent client).
- **Sévérité : 🟡 moyen**
- **Solution recommandée**
  - Pour chaque fichier `use client`, vérifier s’il utilise vraiment : `useState/useEffect/useRef/useForm/useInView`.
  - Les composants *purement statiques* pourraient être server components si la lib permet.

> Ce point nécessite une relecture exhaustive de tous fichiers pour être précis (actuellement incomplet).

---

## C) Risques / recurrences repérées (sans ligne exacte)

### 4) Erreurs potentielles / code dupliqué dans les pages “routes”
- `app/contact/ContactPage.tsx`, `app/communaute/CommunautePage.tsx`, `app/apropos/AProposPage.tsx`, `app/fonctionnalites/FonctionnalitesPage.tsx`, `app/actualite/ActualitePage.tsx`
- Constat : chaque page réimplémente :
  - hero (headline + paragraph + ResponsiveBg)
  - CTA store buttons (souvent même pattern)
  - sections “valeurs/tiers” avec data en inline arrays au lieu de `data/content.ts`
- **Sévérité : 🟡 moyen**
- **Solution** : migrer vers données centralisées + composants partagés.

### 5) API Routes — duplication logique validation/sanitization
- `app/api/contact/route.ts`
- `app/api/newsletter/route.ts`
- Constat :
  - les deux utilisent un rate limiter Upstash + honeypot `_trap`
  - puis sanitization/validation avant appel Brevo
- **Sévérité : 🟡 moyen**
- **Solution**
  - créer helpers dans `lib/` :
    - `withRateLimit()`
    - `getClientIp()`
    - `honeypotGuard()`
    - `sanitizeText()` / `sanitizeEmail()`

---

## D) Exemples de “fichiers inutilisés” / exports jamais utilisés

> Pour produire la liste exacte “jamais importé / jamais utilisé” et “noUnusedLocals” avec numéros de ligne, il faut une passe complète d’analyse sur tous les fichiers. Cette passe est incomplète.

**Néanmoins**, preuves déjà visibles :
- `components/Newsletter.tsx` et `components/home/HomeNewsletter.tsx` coexistent → au minimum une des deux est probablement redondante.
- `components/Hero.tsx` vs `components/home/HomeHero.tsx` → redondance probable.

---

## E) Optimisations Next.js 14 (ciblées)

### 1) Images
- Certaines pages utilisent `next/image` avec `width/height` ✅
- d’autres utilisent `fill` ✅ (si conteneur dimensionné)
- Recommandation : uniformiser.

### 2) Routing & Metadata
- `app/layout.tsx` utilise `generateMetadata()` (bon).

---

## F) Checklist pour compléter le rapport à 100%

1. Lire **tous** les fichiers de :
   - `app/**`, `components/**`, `lib/**`, `types/**`, `data/**`
2. Produire la **carte des dépendances** :
   - imports/exports par fichier
   - reverse deps (qui importe qui)
3. Détection utilisation :
   - imports inutilisés (dans le fichier)
   - exports non importés (dans tout le repo)
   - props jamais lues (par lecture AST)
4. Duplication :
   - détecter store buttons / CTA / hero via comparaison structurelle
5. Types :
   - comparer `types/index.ts` vs types inline (ex: `HomeNewsletter`/`ActualitePage` utilisent parfois des types locaux)

---

## Conclusion
Les axes majeurs confirmés par lecture partielle sont :
- **duplication critique** de “Hero” et “Newsletter” → refactor en composants partagés.
- **répétition** des patterns store buttons / CTA dans plusieurs pages → extraction `StoreButtons` + `CtaSection`.
- **centralisation** : le projet a déjà `data/content.ts`, mais une partie des pages réintroduit des données inline.

Ce fichier est la **version initiale** du rapport. Pour finaliser les livrables #1-#7 strictement (avec numéros de ligne + sévérités détaillées + liste exhaustive inutilisés), il faut finir la lecture complète du repo.

