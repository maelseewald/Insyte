# Insyte – Design-Standards

Verbindliche Design-Regeln für die Insyte-Website. Alle Werte spiegeln den
tatsächlichen Stand im Code (`tailwind.config.ts`, `app/globals.css`,
`lib/motion.ts`, `components/`). Änderungen am Design gehören zuerst in die
Tokens – nicht als Einzelwerte in Komponenten.

---

## 1. Farben (Brand Tokens)

Definiert in `tailwind.config.ts`. **Immer** die Token-Namen verwenden, nie
Hex-Werte direkt im Markup.

| Token    | Hex       | Verwendung |
|----------|-----------|------------|
| `wald`   | `#1A2616` | Headlines, Kontakt-Sektion-Hintergrund, Footer, Logo-Wort |
| `gruen`  | `#2E7D4F` | Primär-Akzent – Buttons, Icons, Links, Fokus-Ring |
| `salbei` | `#D6EDE0` | Icon-Hintergründe (Kreise/Kacheln), Tag-Pills |
| `sand`   | `#F6F3EE` | Seiten-Hintergrund (nicht reinweiss!), Hero |
| `erde`   | `#4A4438` | Fliesstext |
| `leinen` | `#DDD8CF` | Rahmen, Trennlinien, Divider |
| `white`  | `#FFFFFF` | Karten-Hintergründe, Text auf dunklem Grund |

**Regeln**
- Seitenhintergrund ist immer `sand`, nie `white`. Weiss ist für Karten/Kontrastflächen.
- Text auf dunklem `wald`-Grund: `sand` oder `white`; abgeschwächt via `/60`, `/40`.
- Akzente ausschliesslich in `gruen`. Keine zweite Akzentfarbe einführen.
- Opacity-Modifier sind erlaubt und erwünscht für Zwischentöne
  (`bg-sand/80`, `border-gruen/30`, `text-sand/60`) statt neuer Tokens.

---

## 2. Typografie

Zwei Schriften, geladen via `next/font/google` in `app/layout.tsx`.

| Rolle | Font | Gewicht | Tailwind |
|-------|------|---------|----------|
| Display / Headlines | Plus Jakarta Sans | 700 | `font-jakarta font-bold` |
| Fliesstext / UI | Inter | 400 / 500 / 600 | `font-sans` (Default) |

**Skala** (fluid, per `clamp` – nicht die festen `fontSize`-Tokens für Headlines nutzen):

| Element | Klassen |
|---------|---------|
| H1 (Hero) | `text-[clamp(38px,7vw,68px)] leading-[1.04] tracking-[-0.03em]` |
| H2 (Sektion) | `text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-tight` |
| H3 (Karte) | `text-[22px] leading-snug tracking-tight` |
| Fliesstext gross | `text-lg leading-relaxed` |
| Fliesstext | `text-[15px] leading-relaxed` |
| Eyebrow / Label | `text-xs font-semibold uppercase tracking-[0.24em] text-gruen` |

**Regeln**
- Headlines: immer `font-jakarta font-bold`, negatives Tracking, Farbe `text-wald`.
- Fliesstext: `text-erde`, Zeilenhöhe `leading-relaxed`.
- Lange Headlines mit `text-balance` umbrechen.
- Eyebrow steht über der H1/H2, `gruen`, versal, weit gesperrt.

---

## 3. Buttons

Wiederverwendbare Komponentenklassen aus `app/globals.css`. **Nie** Button-Styles
inline nachbauen – diese Klassen verwenden.

```
.btn-primary    → bg-gruen  text-white  (Haupt-CTA)
.btn-secondary  → bg-wald   text-sand   (sekundär)
```

Beide: `font-jakarta`, `rounded-lg px-5 py-2.5 text-sm`, Hover hebt leicht an
(`-translate-y-0.5`) und hellt auf, Active drückt zusammen (`scale-[0.97]`),
sichtbarer Fokus-Ring in `gruen`/`wald`.

**Text-Links / Pfeil-Links** (statt Button): `font-jakarta font-bold text-gruen`
mit Pfeil `→`, der bei `group-hover` per `translate-x-1` nachrückt.

---

## 4. Layout & Spacing

- **Content-Breite:** `max-w-6xl mx-auto` für Sektionen; `max-w-3xl` / `max-w-xl`
  für zentrierte Textblöcke (Hero).
- **Seitenrand:** `px-6` durchgehend.
- **Sektions-Padding:** `py-28` (vertikal grosszügig), Hero `min-h-screen`.
- **Sektions-Trennung:** `border-t border-leinen` zwischen Sektionen, plus
  `scroll-mt-16` für Anker-Sprünge unter die fixe Navbar.
- **Grids:** `grid md:grid-cols-3`; Spalten mit `divide-leinen` trennen statt
  einzelner Karten-Rahmen (siehe Anwendungsfälle-Sektion).

---

## 5. Karten & Oberflächen

- Karte: `bg-white border border-leinen rounded-xl`.
- Icon-Container: `h-12 w-12 rounded-full bg-salbei`, Icon-Stroke `#2E7D4F` (`gruen`).
- Tag-Pill: `bg-salbei text-gruen`.
- **Hover:** dezent – Rahmen nach `border-gruen/30`, kleine Anhebung.
- **Keine** starken Schlagschatten, **keine** Verläufe in UI-Flächen
  (Ausnahme: Platzhalter-Thumbnails).

---

## 6. Icons

- Inline-SVG, `viewBox="0 0 24 24"`, `fill="none"`.
- `stroke="#2E7D4F"`, `strokeWidth="1.7"`, `strokeLinecap/Linejoin="round"`.
- Grösse 22–26px.
- **Immer** `aria-hidden="true"`.
- Logo: konzentrischer Ring (`gruen`) + Punkt; Wortmarke `insyte` mit `gruen` Punkt,
  dreht sich beim Hover (`group-hover:rotate-180`).

---

## 7. Animation (Framer Motion)

Gemeinsame Varianten in `lib/motion.ts` – wiederverwenden, nicht neu erfinden.

| Variante | Zweck |
|----------|-------|
| `fadeInUp` | Standard-Einblendung von unten (`y: 24 → 0`, 0.5s easeOut) |
| `staggerContainer` | Kinder gestaffelt (`staggerChildren: 0.12`) |
| `dropIn` | 3D-Einfall von oben (Spring); Elternteil braucht `perspective` |

**Muster pro Sektion:**
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-80px' })
// motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}
```
- Scroll-Reveal einmalig (`once: true`), triggert 80px vor Eintritt.
- Übergänge kurz und ruhig (0.2–0.5s). Keine dauerhaft laufenden Animationen
  ausser dezentem Logo-/Ring-Detail.
- Smooth-Scrolling läuft global über Lenis (`components/SmoothScroll.tsx`).

---

## 8. Navigation

- Fixe Navbar (`fixed top-0 z-50`), `max-w-6xl px-6 h-16`.
- Transparent oben; ab 20px Scroll: `backdrop-blur-md bg-sand/80 border-b border-leinen`.
- Versteckt sich beim Runterscrollen, erscheint beim Hochscrollen (`-translate-y-full`).
- Aktiver Link: `text-wald` + Unterstrich in `gruen`; inaktiv `text-erde hover:text-gruen`.
- Mobile (`md:` Breakpoint): Hamburger → Slide-down-Menü.
- CTA rechts: `btn-primary` → `/kontakt`.

---

## 9. Barrierefreiheit

- Genau **eine** `<h1>` pro Seite (Hero); danach `<h2>` je Sektion, `<h3>` für Karten.
- Alle dekorativen SVGs `aria-hidden="true"`.
- Nav mit `aria-label`; aktiver Link `aria-current="page"`.
- Formularfelder mit zugehörigem `<label>`.
- Sichtbarer Fokus: `focus-visible:ring-2 focus-visible:ring-gruen`.
- Kontrast AA geprüft: `gruen` auf Weiss, `sand` auf `wald`.

---

## 10. Sprache & Ton

- Sprache: **Deutsch (Schweiz)** – `locale: de_CH`. „ss" statt „ß" (z. B. massgeschneidert, grosszügig).
- Ansprache: Du-Form, direkt, klar, ohne Fachjargon.
- Marke: „Insyte" – junge **Webagentur aus Zürich**. Wortmarke klein: `insyte.`
- Kernbotschaft: eigene Produkte **und** Projekte für Unternehmen.

---

## Referenzdateien

- Tokens: `tailwind.config.ts`
- Basis-Styles & Button-Klassen: `app/globals.css`
- Motion-Varianten: `lib/motion.ts`
- Layout/Fonts/SEO: `app/layout.tsx`
- Muster-Sektion: `components/sections/Anwendungsfaelle.tsx`
- Navigation: `components/layout/Navbar.tsx`
- Ursprüngliche Spec: `docs/superpowers/specs/2026-06-22-insyte-website-design.md`
