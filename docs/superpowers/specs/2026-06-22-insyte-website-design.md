---
name: insyte-website-design
description: Full spec for the Insyte one-person consultancy website — Next.js 14 App Router, Tailwind brand tokens, Framer Motion, Resend contact form, Vercel-ready.
metadata:
  type: project
---

# Insyte Website — Design Spec

## Overview

Single-page marketing site for **Insyte**, a one-person Swiss web & software consultancy targeting local KMUs (SMEs). Built with Next.js 14 App Router for SEO, Tailwind CSS with custom brand tokens, Framer Motion for scroll animations, and Resend for the contact form. Deployed to Vercel.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 + custom tokens in `tailwind.config.ts` |
| Animations | Framer Motion (scroll-triggered fade-in-up) |
| Email | Resend API (`RESEND_API_KEY` env var) |
| Fonts | Plus Jakarta Sans 700 (display), Inter 400 (body) via `next/font/google` |
| Deployment | Vercel (zero-config) |

---

## Brand Tokens

### Colors (tailwind.config.ts)

```ts
colors: {
  wald:   '#1A2616',  // headlines, navbar, footer bg
  gruen:  '#2E7D4F',  // primary accent — buttons, icons, links
  salbei: '#D6EDE0',  // card icon backgrounds
  sand:   '#F6F3EE',  // page background, hero
  erde:   '#4A4438',  // body text
  leinen: '#DDD8CF',  // borders, dividers
  white:  '#FFFFFF',  // card backgrounds
}
```

### Typography

- **Display/Headlines:** Plus Jakarta Sans, weight 700, tracking −0.02em
- **Body:** Inter, weight 400
- `h1` = 56px, `h2` = 40px, `h3` = 24px

### Buttons

- **Primary:** `bg-gruen text-white font-bold rounded-lg hover:brightness-110`
- **Secondary:** `bg-wald text-sand font-semibold rounded-lg hover:brightness-125`

### Design Feel

- Sand (`#F6F3EE`) page background — not pure white
- Cards: `bg-white border border-leinen rounded-xl`
- No gradients in UI (project card thumbs excepted as placeholders)
- No heavy box-shadows
- Subtle hover: border → `border-gruen/30`

---

## Folder Structure

```
insyte/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, globals
│   ├── page.tsx                # Home: renders all section components
│   ├── globals.css             # Tailwind base + scroll-behavior: smooth
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        # POST handler → Resend
│   ├── impressum/
│   │   └── page.tsx            # Placeholder legal page
│   └── datenschutz/
│       └── page.tsx            # Placeholder privacy page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Fixed, blur-on-scroll, mobile hamburger
│   │   └── Footer.tsx          # Dark wald bg, logo white variant
│   └── sections/
│       ├── Hero.tsx
│       ├── Leistungen.tsx
│       ├── Portfolio.tsx
│       ├── UeberMich.tsx
│       └── Kontakt.tsx
├── lib/
│   └── motion.ts               # Shared Framer Motion variants
├── public/
│   └── (static assets)
├── .env.example
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## Page Sections

### Navbar (fixed)

- Logo: ring symbol (SVG circle + inner dot, gruen) + "insyte." wordmark (Plus Jakarta Sans Bold, wald; dot gruen)
- Center nav links: Leistungen | Portfolio | Über mich | Kontakt (smooth scroll via `href="#id"`)
- Right CTA: "Projekt starten" → primary button → `#kontakt`
- On scroll: `backdrop-blur-md`, `border-b border-leinen`
- Mobile ≤768px: hamburger icon → slide-down full-width menu, overlay on open

### Hero (`#hero`)

- Background: `bg-sand`
- Left column:
  - Eyebrow: "Web & Software · Schweiz" — gruen, uppercase, `tracking-widest`, 12px
  - H1: "Wir bringen lokale Unternehmen ins digitale Zeitalter."
  - Body: "Massgeschneiderte Websites und Softwarelösungen für KMUs – entwickelt mit Sorgfalt, erklärt in einfacher Sprache."
  - CTAs: "Leistungen entdecken" (primary) + "Kontakt aufnehmen" (secondary)
- Right column: inline SVG — concentric rings (gruen, increasing opacity inward) with solid center dot; outermost ring has CSS `animate-pulse`

### Leistungen (`#leistungen`)

Three cards on white bg:

| # | Title | Description |
|---|-------|-------------|
| 1 | Websites | Professionelle, schnelle Webauftritte für lokale Unternehmen. Von der Landingpage bis zur Unternehmenswebsite. |
| 2 | Software & Apps | Individuelle Webanwendungen und Tools, die deinen Geschäftsprozess automatisieren. |
| 3 | Wartung & Support | Monatliche Betreuung deiner digitalen Infrastruktur – damit du dich auf dein Kerngeschäft konzentrierst. |

- Icon bg: `bg-salbei`, icon stroke: gruen
- Hover: `hover:border-gruen/30` transition

### Portfolio (`#portfolio`)

Three project cards:

| Project | Tags |
|---------|------|
| Restaurant Adria – Website Relaunch | Next.js, Design |
| Schreinerei Brunner – Auftragsmanagement | Software, React |
| Blumenatelier Lea – Online-Präsenz | Website, CMS |

- Thumb: colored gradient div (wald/gruen tones) as placeholder
- Tags: pill `bg-salbei text-gruen`
- "Alle Projekte →" link in muted style (coming soon, not linked)

### Über mich (`#ueber-mich`)

- Background: `bg-white`
- Two columns: text left, decorative SVG right
- H2: "Technologie, die wirklich hilft."
- Body text as specified
- Stats: "10+ Projekte · Schweizweit · 1 Ansprechpartner" — gruen/wald colors
- SVG: concentric circles + crosshair grid lines (salbei/leinen tones, gruen center dot)

### Kontakt (`#kontakt`)

- Background: `bg-wald`
- Text: white/sand on dark bg
- Form fields: `bg-sand/10 border-sand/20 text-sand placeholder:text-sand/40`
- Fields: Name (required), E-Mail (required), Nachricht (textarea, required)
- Submit: primary button, full width
- Inline success/error state via React state — no page reload
- Below form: `info@insyte.ch` link in gruen

### API Route (`app/api/contact/route.ts`)

- Method: `POST`
- Body: `{ name, email, message }`
- Sends via Resend to `info@insyte.ch`
- Returns `{ success: true }` or `{ error: string }` with appropriate HTTP status
- Rate-limit note: relying on Vercel's default; no custom middleware needed for MVP

### Footer

- Background: `bg-wald`
- Logo (white variant): ring symbol in white + "insyte." wordmark white + dot gruen
- Tagline: "Digitale Lösungen. Lokale Wirkung." in `sand/60`
- Links: Impressum | Datenschutz
- LinkedIn icon (SVG, placeholder href)
- Copyright: "© 2025 Insyte – Alle Rechte vorbehalten"

---

## Animations (Framer Motion)

Shared variants in `lib/motion.ts`:

```ts
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}
export const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
}
```

Each section component uses `useInView` with `once: true, margin: '-80px'` to trigger on scroll entry.

---

## SEO (`app/layout.tsx`)

```ts
export const metadata: Metadata = {
  title: 'Insyte – Digitale Lösungen. Lokale Wirkung.',
  description: 'Massgeschneiderte Websites und Softwarelösungen für KMUs in der Schweiz.',
  metadataBase: new URL('https://insyte.ch'),
  openGraph: {
    title: 'Insyte – Web & Software für KMUs',
    description: '...',
    url: 'https://insyte.ch',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
  alternates: { canonical: 'https://insyte.ch' },
  robots: { index: true, follow: true },
}
```

Heading hierarchy: one `<h1>` in Hero, `<h2>` per section, `<h3>` for cards.

---

## Accessibility

- All SVG icons have `aria-hidden="true"`
- Nav has `aria-label="Hauptnavigation"`
- Form inputs have associated `<label>` elements
- Focus styles: `focus-visible:ring-2 focus-visible:ring-gruen`
- Color contrast: verified (gruen on white passes AA; sand on wald passes AA)

---

## Environment

```env
# .env.example
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Out of Scope (MVP)

- CMS integration (portfolio is hardcoded)
- Analytics
- Blog
- i18n (German only)
- Authentication
