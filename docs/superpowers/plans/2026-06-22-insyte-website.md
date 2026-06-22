# Insyte Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready Next.js 14 single-page marketing website for Insyte, a Swiss KMU-focused web & software consultancy.

**Architecture:** App Router single-page site with fixed navbar and six scroll sections (Hero, Leistungen, Portfolio, Über mich, Kontakt); server-side API route for contact form using Resend; Framer Motion fade-in-up animations triggered by scroll entry.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS v3 (custom brand tokens), Framer Motion, Resend, Vercel.

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout — fonts, global metadata, lang=de |
| `app/globals.css` | Tailwind base + scroll-behavior + btn components |
| `app/page.tsx` | Home — renders all sections in order |
| `app/api/contact/route.ts` | POST handler — validates fields, sends via Resend |
| `app/impressum/page.tsx` | Placeholder legal page |
| `app/datenschutz/page.tsx` | Placeholder privacy page |
| `components/layout/Navbar.tsx` | Fixed nav, scroll blur, mobile hamburger |
| `components/layout/Footer.tsx` | Dark footer, logo white variant, links |
| `components/sections/Hero.tsx` | Eyebrow, H1, CTAs, pulsing SVG illustration |
| `components/sections/Leistungen.tsx` | 3 service cards with salbei icon bg |
| `components/sections/Portfolio.tsx` | 3 project cards with gradient placeholder thumbs |
| `components/sections/UeberMich.tsx` | Two-col text + decorative SVG, stats |
| `components/sections/Kontakt.tsx` | Contact form with inline success/error state |
| `lib/motion.ts` | Shared Framer Motion variants (fadeInUp, staggerContainer) |
| `tailwind.config.ts` | Brand color tokens + font families |
| `.env.example` | RESEND_API_KEY placeholder |
| `next.config.mjs` | Minimal Next.js config |

---

## Task 1: Scaffold Next.js 14 project

**Files:**
- Create: all scaffolded files
- Create: `.gitignore` (add `.superpowers/` entry)

- [ ] **Step 1: Run create-next-app in project root**

```bash
cd /Users/mse/Desktop/060_Insyte/insyte
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --no-eslint
```

When prompted "The directory is not empty. Continue? (y/N)", type `y`.

When asked about `src/` directory, choose **No**.
When asked about App Router, choose **Yes**.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion resend
```

- [ ] **Step 3: Verify scaffold**

```bash
npm run dev
```

Expected: dev server starts at `http://localhost:3000`. Kill with Ctrl+C.

- [ ] **Step 4: Add .superpowers to .gitignore**

Open `.gitignore` and add at the bottom:
```
.superpowers/
```

- [ ] **Step 5: Commit scaffold**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js 14 project"
```

---

## Task 2: Tailwind config with brand tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        wald:   '#1A2616',
        gruen:  '#2E7D4F',
        salbei: '#D6EDE0',
        sand:   '#F6F3EE',
        erde:   '#4A4438',
        leinen: '#DDD8CF',
        white:  '#FFFFFF',
      },
      fontFamily: {
        jakarta: ['var(--font-jakarta)', 'sans-serif'],
        inter:   ['var(--font-inter)', 'sans-serif'],
        sans:    ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'heading':  ['40px', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'subhead':  ['24px', { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Replace app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

@layer components {
  .btn-primary {
    @apply bg-gruen text-white font-bold font-jakarta rounded-lg px-5 py-2.5 text-sm
           hover:brightness-110 transition-all duration-200 inline-block;
  }
  .btn-secondary {
    @apply bg-wald text-sand font-semibold font-jakarta rounded-lg px-5 py-2.5 text-sm
           hover:brightness-125 transition-all duration-200 inline-block;
  }
}
```

- [ ] **Step 3: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts app/globals.css
git commit -m "feat: add brand tokens and button components to Tailwind"
```

---

## Task 3: Root layout with fonts and SEO metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace app/layout.tsx**

```tsx
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Insyte – Digitale Lösungen. Lokale Wirkung.',
  description:
    'Massgeschneiderte Websites und Softwarelösungen für KMUs in der Schweiz – entwickelt mit Sorgfalt, erklärt in einfacher Sprache.',
  metadataBase: new URL('https://insyte.ch'),
  openGraph: {
    title: 'Insyte – Web & Software für KMUs in der Schweiz',
    description:
      'Massgeschneiderte Websites und Softwarelösungen für KMUs – entwickelt mit Sorgfalt, erklärt in einfacher Sprache.',
    url: 'https://insyte.ch',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
  alternates: { canonical: 'https://insyte.ch' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-sand text-erde font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify types compile**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Google Fonts and SEO metadata"
```

---

## Task 4: Shared Framer Motion variants

**Files:**
- Create: `lib/motion.ts`

- [ ] **Step 1: Create lib/motion.ts**

```bash
mkdir -p lib
```

```ts
import { type Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/motion.ts
git commit -m "feat: add shared Framer Motion animation variants"
```

---

## Task 5: Navbar component

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p components/layout
```

- [ ] **Step 2: Create components/layout/Navbar.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Über mich', href: '#ueber-mich' },
  { label: 'Kontakt', href: '#kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-sand/80 border-b border-leinen'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="9.5" stroke="#2E7D4F" strokeWidth="2.2" />
            <circle cx="11" cy="11" r="3.5" fill="#2E7D4F" />
          </svg>
          <span className="font-jakarta font-bold text-xl text-wald leading-none">
            insyte<span className="text-gruen">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-8"
          aria-label="Hauptnavigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-erde hover:text-gruen transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href="#kontakt" className="hidden md:inline-block btn-primary">
          Projekt starten
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-wald p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      {menuOpen && (
        <nav
          className="md:hidden bg-sand/95 backdrop-blur-sm border-t border-leinen px-6 py-5 flex flex-col gap-4"
          aria-label="Mobile Navigation"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-erde py-1 hover:text-gruen transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="btn-primary text-center mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Projekt starten
          </a>
        </nav>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add Navbar with scroll-blur and mobile hamburger menu"
```

---

## Task 6: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p components/sections
```

- [ ] **Step 2: Create components/sections/Hero.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

function PulseIllustration() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute rounded-full border border-gruen"
        style={{ width: '100%', height: '100%' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.06, 0.12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Middle ring */}
      <div
        className="absolute rounded-full border border-gruen/25"
        style={{ width: '75%', height: '75%' }}
        aria-hidden="true"
      />
      {/* Inner ring */}
      <div
        className="absolute rounded-full border border-gruen/40"
        style={{ width: '50%', height: '50%' }}
        aria-hidden="true"
      />
      {/* Center */}
      <div className="w-16 h-16 rounded-full bg-salbei border-2 border-gruen flex items-center justify-center z-10">
        <div className="w-5 h-5 rounded-full bg-gruen" />
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="hero"
      className="bg-sand min-h-screen flex items-center pt-16"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center w-full"
      >
        {/* Text */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-widest mb-5"
          >
            Web & Software · Schweiz
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-jakarta font-bold text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight text-wald mb-6"
          >
            Wir bringen lokale Unternehmen ins digitale Zeitalter.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-erde text-lg leading-relaxed mb-10 max-w-xl"
          >
            Massgeschneiderte Websites und Softwarelösungen für KMUs –
            entwickelt mit Sorgfalt, erklärt in einfacher Sprache.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
            <a href="#leistungen" className="btn-primary">
              Leistungen entdecken
            </a>
            <a href="#kontakt" className="btn-secondary">
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <PulseIllustration />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with pulsing SVG illustration and Framer Motion"
```

---

## Task 7: Leistungen section

**Files:**
- Create: `components/sections/Leistungen.tsx`

- [ ] **Step 1: Create components/sections/Leistungen.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const SERVICES = [
  {
    title: 'Websites',
    description:
      'Professionelle, schnelle Webauftritte für lokale Unternehmen. Von der Landingpage bis zur Unternehmenswebsite.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'Software & Apps',
    description:
      'Individuelle Webanwendungen und Tools, die deinen Geschäftsprozess automatisieren.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Wartung & Support',
    description:
      'Monatliche Betreuung deiner digitalen Infrastruktur – damit du dich auf dein Kerngeschäft konzentrierst.',
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2E7D4F"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
]

export default function Leistungen() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="leistungen" className="bg-sand py-24 px-6 border-t border-leinen">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Was ich anbiete
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-14"
        >
          Leistungen
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <motion.div
              key={service.title}
              variants={fadeInUp}
              className="bg-white border border-leinen rounded-xl p-7 hover:border-gruen/30 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-salbei flex items-center justify-center mb-5">
                {service.icon}
              </div>
              <h3 className="font-jakarta font-bold text-xl text-wald mb-3">
                {service.title}
              </h3>
              <p className="text-erde text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Leistungen.tsx
git commit -m "feat: add Leistungen section with animated service cards"
```

---

## Task 8: Portfolio section

**Files:**
- Create: `components/sections/Portfolio.tsx`

- [ ] **Step 1: Create components/sections/Portfolio.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const PROJECTS = [
  {
    title: 'Restaurant Adria – Website Relaunch',
    tags: ['Next.js', 'Design'],
    thumbClass: 'from-wald to-[#2d4a2a]',
    thumbLabel: 'RESTAURANT ADRIA',
  },
  {
    title: 'Schreinerei Brunner – Auftragsmanagement',
    tags: ['Software', 'React'],
    thumbClass: 'from-[#2e4a3e] to-gruen',
    thumbLabel: 'SCHREINEREI BRUNNER',
  },
  {
    title: 'Blumenatelier Lea – Online-Präsenz',
    tags: ['Website', 'CMS'],
    thumbClass: 'from-[#3a3228] to-erde',
    thumbLabel: 'BLUMENATELIER LEA',
  },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="portfolio"
      className="bg-white py-24 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Referenzen
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-14"
        >
          Ausgewählte Projekte
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="bg-white border border-leinen rounded-xl overflow-hidden hover:border-gruen/30 transition-colors duration-200"
            >
              {/* Placeholder thumb */}
              <div
                className={`h-44 bg-gradient-to-br ${project.thumbClass} flex items-center justify-center`}
              >
                <span className="text-white/50 text-xs font-semibold tracking-widest font-jakarta">
                  {project.thumbLabel}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-jakarta font-bold text-[15px] text-wald mb-3 leading-snug">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-salbei text-gruen text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeInUp}
          className="mt-8 text-leinen text-sm"
        >
          Alle Projekte →
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Portfolio.tsx
git commit -m "feat: add Portfolio section with project cards and tags"
```

---

## Task 9: Über mich section

**Files:**
- Create: `components/sections/UeberMich.tsx`

- [ ] **Step 1: Create components/sections/UeberMich.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const STATS = ['10+ Projekte', 'Schweizweit', '1 Ansprechpartner']

function DecorativeSVG() {
  return (
    <svg
      width="280"
      height="280"
      viewBox="0 0 280 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="140" cy="140" r="130" stroke="#DDD8CF" strokeWidth="1" />
      <circle cx="140" cy="140" r="90" stroke="#DDD8CF" strokeWidth="1" />
      <circle cx="140" cy="140" r="50" fill="#D6EDE0" />
      <circle cx="140" cy="140" r="18" fill="#2E7D4F" />
      <line x1="10" y1="140" x2="270" y2="140" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="140" y1="10" x2="140" y2="270" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="48" y1="48" x2="232" y2="232" stroke="#DDD8CF" strokeWidth="0.5" />
      <line x1="232" y1="48" x2="48" y2="232" stroke="#DDD8CF" strokeWidth="0.5" />
    </svg>
  )
}

export default function UeberMich() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="ueber-mich"
      className="bg-white py-24 px-6 border-t border-leinen"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Text */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-widest mb-3"
          >
            Über mich
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-wald mb-6"
          >
            Technologie, die wirklich hilft.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-erde text-base leading-relaxed mb-8"
          >
            Ich bin Entwickler mit Leidenschaft für sauberen Code und
            durchdachtes Design. Mein Fokus liegt auf lokalen KMUs, die einen
            verlässlichen digitalen Partner suchen – keinen anonymen Anbieter,
            sondern jemanden, der zuhört und mitdenkt.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            {STATS.map((stat, i) => (
              <span key={stat} className="flex items-center gap-5">
                <span className="font-jakarta font-bold text-sm text-gruen">
                  {stat}
                </span>
                {i < STATS.length - 1 && (
                  <span className="text-leinen select-none">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Decorative SVG */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <DecorativeSVG />
        </motion.div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/UeberMich.tsx
git commit -m "feat: add Über mich section with decorative SVG and stats"
```

---

## Task 10: Contact API route

**Files:**
- Create: `app/api/contact/route.ts`
- Create: `.env.example`

- [ ] **Step 1: Create app/api/contact/route.ts**

```bash
mkdir -p app/api/contact
```

```ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Ungültige Anfrage.' },
      { status: 400 }
    )
  }

  const { name, email, message } = body as {
    name?: string
    email?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: 'Alle Felder sind erforderlich.' },
      { status: 400 }
    )
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: 'Ungültige E-Mail-Adresse.' },
      { status: 400 }
    )
  }

  try {
    await resend.emails.send({
      from: 'Insyte Website <noreply@insyte.ch>',
      to: 'info@insyte.ch',
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'E-Mail konnte nicht gesendet werden. Bitte versuche es später.' },
      { status: 500 }
    )
  }
}
```

- [ ] **Step 2: Create .env.example**

```bash
# .env.example
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

Create this file at the project root.

- [ ] **Step 3: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/api/contact/route.ts .env.example
git commit -m "feat: add contact API route with Resend and input validation"
```

---

## Task 11: Kontakt section

**Files:**
- Create: `components/sections/Kontakt.tsx`

- [ ] **Step 1: Create components/sections/Kontakt.tsx**

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const INPUT_CLASS =
  'w-full bg-sand/10 border border-sand/20 rounded-lg px-4 py-3 text-sand placeholder:text-sand/40 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gruen transition-colors'

export default function Kontakt() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json() as { success?: boolean; error?: string }

      if (!res.ok || !data.success) {
        throw new Error(data.error ?? 'Unbekannter Fehler.')
      }

      setState('success')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setState('error')
      setErrorMsg(
        err instanceof Error ? err.message : 'Fehler beim Senden.'
      )
    }
  }

  return (
    <section id="kontakt" className="bg-wald py-24 px-6">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-xl"
      >
        <motion.p
          variants={fadeInUp}
          className="text-salbei/60 text-xs font-semibold uppercase tracking-widest mb-3"
        >
          Kontakt
        </motion.p>
        <motion.h2
          variants={fadeInUp}
          className="font-jakarta font-bold text-[40px] leading-tight tracking-tight text-white mb-3"
        >
          Projekt starten
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="text-sand/70 text-base mb-10"
        >
          Schreib mir – ich melde mich innerhalb von 24 Stunden.
        </motion.p>

        {state === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 text-salbei"
          >
            <p className="font-jakarta font-bold text-2xl mb-2 text-white">
              Danke!
            </p>
            <p>Deine Nachricht ist angekommen. Ich melde mich bald.</p>
          </motion.div>
        ) : (
          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-sand/60 mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Max Muster"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-sand/60 mb-1.5"
              >
                E-Mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="max@beispiel.ch"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className={INPUT_CLASS}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-semibold text-sand/60 mb-1.5"
              >
                Nachricht
              </label>
              <textarea
                id="message"
                required
                rows={5}
                placeholder="Erzähl mir von deinem Projekt..."
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className={`${INPUT_CLASS} resize-none`}
              />
            </div>

            {state === 'error' && (
              <p className="text-red-400 text-sm" role="alert">
                {errorMsg || 'Fehler beim Senden. Bitte versuche es später erneut.'}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="btn-primary w-full text-center py-3.5 disabled:opacity-60"
            >
              {state === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
            </button>
          </motion.form>
        )}

        <motion.p variants={fadeInUp} className="mt-7 text-center">
          <a
            href="mailto:info@insyte.ch"
            className="text-gruen text-sm hover:brightness-110 transition-all"
          >
            info@insyte.ch
          </a>
        </motion.p>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Kontakt.tsx
git commit -m "feat: add Kontakt section with form, inline success/error state"
```

---

## Task 12: Footer component

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create components/layout/Footer.tsx**

```tsx
export default function Footer() {
  return (
    <footer className="bg-wald border-t border-white/5 px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 22 22"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="9.5" stroke="white" strokeWidth="2.2" />
              <circle cx="11" cy="11" r="3.5" fill="#2E7D4F" />
            </svg>
            <span className="font-jakarta font-bold text-lg text-white leading-none">
              insyte<span className="text-gruen">.</span>
            </span>
          </div>
          <p className="text-sand/50 text-xs">
            Digitale Lösungen. Lokale Wirkung.
          </p>
        </div>

        {/* Links */}
        <nav
          className="flex items-center gap-5"
          aria-label="Footer Navigation"
        >
          <a
            href="/impressum"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Impressum
          </a>
          <a
            href="/datenschutz"
            className="text-sand/50 text-xs hover:text-sand/80 transition-colors"
          >
            Datenschutz
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-sand/50 hover:text-sand/80 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-sand/40 text-xs">
          © 2025 Insyte – Alle Rechte vorbehalten
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify types**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer with logo white variant, nav links, LinkedIn icon"
```

---

## Task 13: Assemble home page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

```tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Leistungen from '@/components/sections/Leistungen'
import Portfolio from '@/components/sections/Portfolio'
import UeberMich from '@/components/sections/UeberMich'
import Kontakt from '@/components/sections/Kontakt'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Leistungen />
        <Portfolio />
        <UeberMich />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Run full build to verify**

```bash
npm run build
```

Expected: `Route (app)` table shows `/` and `/api/contact`. No TypeScript or build errors. Ignore any "missing RESEND_API_KEY" warnings at build time.

- [ ] **Step 3: Smoke-test in dev**

```bash
npm run dev
```

Open `http://localhost:3000`. Verify:
- Navbar renders with logo and nav links
- Hero section visible with illustration
- All sections visible when scrolling
- Contact form submits (will error without API key — expected)
- Mobile menu works at narrow viewport

Kill with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Task 14: Legal placeholder pages

**Files:**
- Create: `app/impressum/page.tsx`
- Create: `app/datenschutz/page.tsx`

- [ ] **Step 1: Create app/impressum/page.tsx**

```bash
mkdir -p app/impressum
```

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – Insyte',
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <main className="min-h-screen bg-sand px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-gruen text-sm hover:brightness-110 mb-8 block"
        >
          ← Zurück
        </Link>
        <h1 className="font-jakarta font-bold text-[40px] tracking-tight text-wald mb-8">
          Impressum
        </h1>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <p>
            <strong>Insyte</strong>
            <br />
            [Strasse und Hausnummer]
            <br />
            [PLZ Ort], Schweiz
          </p>
          <p>
            E-Mail:{' '}
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
          </p>
          <p className="text-sm text-erde/60">
            [Weitere Angaben gemäss Schweizer Recht]
          </p>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Create app/datenschutz/page.tsx**

```bash
mkdir -p app/datenschutz
```

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutz – Insyte',
  robots: { index: false, follow: false },
}

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-sand px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-gruen text-sm hover:brightness-110 mb-8 block"
        >
          ← Zurück
        </Link>
        <h1 className="font-jakarta font-bold text-[40px] tracking-tight text-wald mb-8">
          Datenschutzerklärung
        </h1>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <p>
            Der Schutz deiner persönlichen Daten ist uns wichtig. Diese
            Datenschutzerklärung informiert dich über die Verarbeitung
            personenbezogener Daten auf dieser Website.
          </p>
          <h2 className="font-jakarta font-bold text-xl text-wald pt-4">
            Kontaktformular
          </h2>
          <p>
            Wenn du das Kontaktformular verwendest, werden die eingegebenen
            Daten (Name, E-Mail, Nachricht) ausschliesslich zur Bearbeitung
            deiner Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
          <p className="text-sm text-erde/60">
            [Vollständige Datenschutzerklärung gemäss DSG/DSGVO ergänzen]
          </p>
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: routes `/impressum` and `/datenschutz` appear in the route table, no errors.

- [ ] **Step 4: Commit**

```bash
git add app/impressum/page.tsx app/datenschutz/page.tsx
git commit -m "feat: add Impressum and Datenschutz placeholder pages"
```

---

## Task 15: Vercel config and final polish

**Files:**
- Create: `next.config.mjs` (update)
- Verify: `.env.example` exists

- [ ] **Step 1: Update next.config.mjs**

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Strict mode catches potential issues early
  reactStrictMode: true,
}

export default nextConfig
```

- [ ] **Step 2: Verify .env.example is at project root**

```bash
cat .env.example
```

Expected output:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

- [ ] **Step 3: Final full build**

```bash
npm run build
```

Expected: clean build, no errors, no TypeScript warnings.

- [ ] **Step 4: Final dev smoke test**

```bash
npm run dev
```

Check at `http://localhost:3000`:
1. Page background is sand (#F6F3EE) — not white
2. Navbar becomes blurred/bordered on scroll
3. Hero H1 visible, illustration pulsing
4. Framer Motion animations trigger on scroll for each section
5. Leistungen cards have salbei icon bg with gruen icons
6. Portfolio cards show gradient thumbnails with tag pills
7. Über mich shows decorative SVG and stats row
8. Kontakt section has dark wald background; form fields styled correctly
9. Footer shows white logo variant + tagline
10. `/impressum` and `/datenschutz` routes work

Kill with Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add next.config.mjs
git commit -m "feat: finalize Vercel config and complete Insyte website MVP"
```

---

## Spec Coverage Check

| Spec requirement | Task |
|-----------------|------|
| Next.js 14 App Router, TypeScript | Task 1 |
| Tailwind brand tokens (wald, gruen, salbei, sand, erde, leinen) | Task 2 |
| Plus Jakarta Sans + Inter via next/font | Task 3 |
| SEO metadata + OG tags + canonical | Task 3 |
| Framer Motion fadeInUp + stagger per section | Tasks 4, 6–11 |
| Navbar fixed, blur on scroll, mobile hamburger | Task 5 |
| Hero: eyebrow, H1, subtext, 2 CTAs, SVG illustration | Task 6 |
| Leistungen: 3 cards, salbei icon bg, hover border | Task 7 |
| Portfolio: 3 project cards, gradient thumbs, tag pills | Task 8 |
| Über mich: two-col, decorative SVG, stats | Task 9 |
| Contact API route with Resend + validation | Task 10 |
| Kontakt: dark bg, form, inline success/error state | Task 11 |
| Footer: white logo, tagline, links, LinkedIn, copyright | Task 12 |
| Home page assembly | Task 13 |
| Impressum + Datenschutz placeholder pages | Task 14 |
| Vercel-ready config, .env.example | Task 15 |
| `html { scroll-behavior: smooth }` | Task 2 |
| Accessibility: aria-labels, heading hierarchy, focus-visible | Tasks 5–11 |
