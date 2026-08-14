# Site Teardown: Velour

**URL:** https://www.velour-art.com/
**Built by:** nicht aus Meta-Tags oder Footer ableitbar
**Platform:** Next.js (App Router) + Turbopack — bestätigt aus `/_next/static/chunks/turbopack-*.js` und dem Fehlen von `__NEXT_DATA__`
**Date analyzed:** 2026-08-14

**Analysemethode:** gerendertes DOM + Computed Styles über Browser-Automation, CSS- und JS-Chunks roh per `curl` (kein WebFetch — dessen Sub-Modell hätte genau die Werte zusammengefasst, auf die es hier ankommt). Alle Angaben unten sind **aus der Quelle bestätigt**, sofern nicht als *inferred* markiert.

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| Next.js App Router | `/_next/static/chunks/*`, kein `__NEXT_DATA__` | Framework, SSR |
| Turbopack | Chunk `turbopack-15cuf7dxacjyz.js` | Bundler |
| Tailwind CSS v4 | `@layer base`, `--spacing`, `--lightningcss-*` in der CSS | Utility-Styling, Token-Definition |
| framer-motion | `whileInView`, `AnimatePresence`, `layoutId`, `MotionConfig` in 2–5 Chunks | Komponenten-Animation |
| next/font/google | CSS-Module-Klassen `*_variable` auf `<html>` | 4 selbstgehostete Schriften |
| IntersectionObserver (nativ) | eigene `ScrollTrigger`-Komponente | Scroll-Reveals |

**Was NICHT drin ist** — und das ist die wichtigste Erkenntnis des Teardowns:

| Nicht verwendet | Geprüft via |
|---|---|
| GSAP / ScrollTrigger | `gsap: 0 Chunks` |
| Lenis / Locomotive | `lenis: 0 Chunks`, `scroll-behavior: auto` |
| Swiper / Embla | `0 Chunks` |

> Die Seite hat **keine** Smooth-Scroll-Library und **keine** Scroll-Animations-Library. Was aufwendig aussieht, sind sieben Custom-CSS-Klassen und eine 15-Zeilen-React-Komponente.
>
> ⚠️ Die Klasse `ScrollTrigger` im Bundle ist **nicht** GSAP, sondern eine gleichnamige Eigenentwicklung. Wer nur nach dem Namen greppt, zieht den falschen Schluss.

---

## Design System

### Colors

Alle Werte als CSS Custom Properties (Tailwind v4 `@theme`), 1:1 aus der kompilierten CSS.

| Name/Usage | Token | Value |
|---|---|---|
| Hintergrund | `--color-bg` | `#0b0906` |
| Fläche (Karten) | `--color-surface` | `#15110c` |
| Erhöhte Fläche | `--color-elevated` | `#1e1810` |
| Overlay | `--color-overlay` | `#2a2117` |
| Rahmen | `--color-border` | `#2b2318` |
| Rahmen stark | `--color-border-strong` | `#443826` |
| Text primär | `--color-fg` | `#f2ebdd` |
| Text gedämpft | `--color-muted` | `#b0a693` |
| Text subtil | `--color-subtle` | `#7d7361` |
| Creme | `--color-cream` | `#efe4cd` |
| **Akzent (Messing)** | `--color-accent` | `#c9a049` |
| Akzent weich | `--color-accent-soft` | `#e0c284` |
| Akzent Hover | `--color-accent-hover` | `#b88c34` |
| Auf Akzent | `--color-on-accent` | `#100c07` |
| **Marker-Rot** | `--color-crimson` | `#c8321f` |
| Blau (selten) | `--color-prussian` | `#1d4a80` |

Die Palette ist durchgehend **warm** — selbst das Schwarz (`#0b0906`) hat einen Braunstich. Kein einziger neutraler Grauwert.

### Typography

Vier Rollen, alle über `next/font/google` selbstgehostet.

| Role | Font Family | Weight | Letter-spacing | Token |
|---|---|---|---|---|
| Display | Bricolage Grotesque | 800 | — | `--font-display` |
| Body | Space Grotesk | 400 | — | `--font-sans` |
| Utility/Labels | Geist Mono | 500 | `.18em` | `--font-mono` |
| **Akzent** | Permanent Marker | 400 | `.02em` | `--font-painted` |

Fallback-Kette des Akzents: `--font-painted: var(--font-marker), var(--font-display), sans-serif` — fällt also auf die Display-Schrift zurück, nicht auf System-Sans.

### Spacing / Radii

```
--spacing: .25rem          (Tailwind-v4-Basis)
--radius-sm:   .375rem
--radius-btn:  .5rem
--radius-card: .75rem
--radius-pill: 999px
--blur-sm: 8px   --blur-xl: 24px
--ease-out: cubic-bezier(0, 0, .2, 1)
```

Fluide Typo über `clamp()` — im Hero z.B. `clamp(3.6rem, min(9vw, 12vh), 7rem)`. Beachtenswert: das `min(9vw, 12vh)` koppelt die Schriftgröße an **beide** Viewport-Achsen, damit die Headline auf niedrigen Querformat-Fenstern nicht überläuft.

---

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Painted-Word-Akzent | Permanent Marker + `-webkit-text-stroke` + Rotation | Low | Ja |
| Scroll-Reveal | IntersectionObserver setzt `.in-view`, CSS-Transition | Low | Ja |
| Film-Grain | Inline-SVG `feTurbulence`, `mix-blend-mode: overlay` | Low | Ja |
| Marquee | CSS-Keyframe `translate(-50%)` auf doppeltem Inhalt | Low | Ja |
| Float | 8px Sinus-Schwebe mit erhaltener Rotation | Low | Ja |
| Snap-Row | natives CSS Scroll-Snap, versteckte Scrollbar | Low | Ja |
| Hair-Rule | `::after` mit `flex: 1` und 1px Höhe | Low | Ja |

Das komplette Custom-CSS der Seite besteht aus diesen **sieben Klassen**. Alles andere sind Tailwind-Utilities.

---

## Implementation Details

### 1. Painted-Word — der Marker-Akzent

Der Effekt, der die Seite prägt. Der Trick ist **nicht** die Schriftart allein.

```css
.painted-word {
  font-family: var(--font-painted);      /* Permanent Marker */
  font-size: 1.06em;                     /* 6% größer als Umgebung */
  letter-spacing: .02em;
  -webkit-text-stroke: .012em currentColor;
  paint-order: stroke fill;              /* ← der eigentliche Trick */
  padding-block: .14em;
  padding-inline: .1em;
  line-height: 1;
  font-weight: 400;
  display: inline-block;
}
```

**Die Erkenntnis:** `-webkit-text-stroke` legt eine haarfeine Kontur in derselben Farbe um jede Glyphe, `paint-order: stroke fill` zeichnet sie *unter* die Füllung. Ergebnis: die Buchstaben werden minimal dicker und ihre Kanten weicher — es liest sich als aufgetragene Tinte statt als Schriftart. Ohne diese zwei Zeilen sieht Permanent Marker nach Font aus, mit ihnen nach Stift.

Die Schräglage sitzt **nicht** auf `.painted-word` selbst, sondern auf einem Eltern-`<span>`:

```
transform: matrix(0.99961, -0.0279216, 0.0279216, 0.99961, 0, 0)
→ rotate(-1.6deg)
```

Getrennt gehalten, damit `inline-block` + Rotation sich nicht mit dem Zeilenumbruch beißen.

`will-change: filter` steht drin, wird aber von `.painted-word { filter: none !important }` wieder neutralisiert — vermutlich ein Überbleibsel eines verworfenen Filter-Effekts. **Nicht übernehmen**, das ist toter Code der eine unnötige Compositing-Ebene erzeugt.

Einsatz auf der Startseite: 3× (`"tells you"`, `"that hits you."`, `"80 times a day."`) — sparsam, immer nur ein bis drei Wörter.

### 2. Scroll-Reveal — eigene ScrollTrigger-Komponente

```jsx
function ScrollTrigger({ children, className = "", delay = 0, as = "div" }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in-view")   // Fallback: sofort sichtbar
      return
    }
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in-view")
          io.unobserve(e.target)     // one-shot
        }
      }
    }, { rootMargin: "0px 0px -10% 0px", threshold: .12 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const d = delay ? ` delay-${delay}` : ""
  return <Tag ref={ref} className={`scroll-trigger${d} ${className}`.trim()}>{children}</Tag>
}
```

Das zugehörige CSS:

```css
.scroll-trigger {
  opacity: 0;
  transform: translateY(26px);
  will-change: opacity, transform;
  transition: opacity .7s cubic-bezier(.22,1,.36,1),
              transform .7s cubic-bezier(.22,1,.36,1);
}
.scroll-trigger.in-view { opacity: 1; transform: translateY(0) }

.scroll-trigger.delay-1 { transition-delay:  60ms }
.scroll-trigger.delay-2 { transition-delay: 120ms }
.scroll-trigger.delay-3 { transition-delay: 180ms }
.scroll-trigger.delay-4 { transition-delay: 240ms }

@media (prefers-reduced-motion: reduce) {
  .scroll-trigger { opacity: 1; transition: none; transform: none }
}
```

Bemerkenswerte Details:
- **`unobserve` nach dem ersten Trigger** — kein Re-Animieren beim Zurückscrollen, und der Observer räumt sich selbst ab.
- **`rootMargin: 0 0 -10% 0`** — löst erst aus, wenn das Element 10% über der Unterkante steht, nicht schon beim Anschneiden.
- **Stagger über Klassen statt Inline-Styles** — `delay-1..4`, feste 60ms-Schritte. Begrenzt auf vier Stufen; mehr wäre bei 0.7s Transition auch zu träge.
- **Reduced-Motion sauber abgedeckt.**

### 3. Film-Grain ohne Asset

```css
.grain::after {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none;
  opacity: .14;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='120' height='120' filter='url(#n)'/></svg>");
}
```

Kein Bild-Asset, kein Netzwerk-Request — `feTurbulence` erzeugt das Rauschen im Browser. `stitchTiles='stitch'` macht die 120×120-Kachel nahtlos, `feColorMatrix saturate 0` entfärbt sie. Bei `opacity .14` + `overlay` legt sich eine Filmkorn-Textur über die Fläche, die den warmen Dunkelton „analog" wirken lässt.

Auf der Startseite ist `.grain` allerdings **an keinem Element aktiv** — die Klasse ist definiert, aber ungenutzt (vermutlich auf Unterseiten im Einsatz).

### 4. Marquee, Float, Snap-Row, Hair-Rule

```css
@keyframes velour-marquee { 0% { transform: translate(0) } to { transform: translate(-50%) } }
.marquee-track { display: flex; gap: 3rem; width: max-content; animation: 30s linear infinite velour-marquee }

@keyframes velour-float {
  0%, to { transform: translateY(0)    rotate(var(--rot, 0deg)) }
  50%    { transform: translateY(-8px) rotate(var(--rot, 0deg)) }
}
.float-slow { animation: 7s ease-in-out infinite velour-float }

.snap-row { display: flex; overflow-x: auto; scroll-snap-type: x mandatory;
            gap: 1.25rem; scroll-padding-inline: 1.5rem;
            scrollbar-width: none; -ms-overflow-style: none }
.snap-row::-webkit-scrollbar { display: none }
.snap-row > * { scroll-snap-align: start; flex-shrink: 0 }

.hair-rule { display: flex; align-items: center; justify-content: center; gap: .75rem; color: currentColor }
.hair-rule::after { content: ""; flex: 1; height: 1px; background: currentColor; opacity: .25 }
```

- **Marquee**: `translate(-50%)` setzt voraus, dass der Inhalt im Markup **doppelt** steht — dann ist der Sprung zurück auf 0% unsichtbar.
- **Float**: `rotate(var(--rot, 0deg))` in *beiden* Keyframes erhält eine per Inline-Style gesetzte Grundneigung. Ohne diesen Kniff würde die Animation eine vorhandene Rotation überschreiben.
- Marquee und Float sind beide unter `prefers-reduced-motion` auf `animation: none` gesetzt.

---

## Assets Needed to Recreate

1. **Gemälde-Artworks** (Hero + Produktraster) — das einzige echte Asset. Ölgemälde-Optik, warme Erdtöne, starke Textur. Per Midjourney: *"impasto oil painting, thick visible brushstrokes, warm ochre and umber palette, dramatic side lighting, [Motiv], painterly texture --ar 16:9"*.
2. **Film-Grain** — kein Asset nötig, siehe Effekt 3.
3. **Schriften** — alle vier auf Google Fonts, per `next/font/google` selbstgehostet.
4. **Kompass-/Sonnen-SVG** im Hero rechts — als Inline-SVG nachbaubar (konzentrische Kreise + radiale Striche, ~1px Linien in `--color-fg` bei sehr niedriger Deckkraft).

---

## Build Plan

### Recommended Stack

- **Next.js App Router** — was die Vorlage nutzt, keine Reibung
- **Tailwind v4** — die gesamte Token-Tabelle oben lässt sich direkt als `@theme` übernehmen
- **framer-motion** — nur wenn tatsächlich `AnimatePresence`/`layoutId` gebraucht wird; die Scroll-Reveals brauchen es **nicht**
- **keine** Scroll- oder Animations-Library darüber hinaus

```bash
npm install next react react-dom tailwindcss
# optional, nur bei Bedarf:
npm install framer-motion
```

### Section-by-Section Build Order

**1. Tokens + Fonts**
Die `@theme`-Tabelle und die vier `next/font`-Deklarationen. Erst danach Komponenten — sonst werden Farbwerte hartkodiert.

**2. `ScrollTrigger` + `.scroll-trigger`-CSS**
Basis für jede weitere Section. 20 Zeilen, deckt die gesamte Reveal-Choreografie ab.

**3. Hero**
Vollbild-Artwork, Eyebrow in `.label-mono`, Headline in Bricolage 800 mit `clamp(3.6rem, min(9vw, 12vh), 7rem)`, darin ein bis zwei `.painted-word`-Akzente im Eltern-Span mit `rotate(-1.6deg)`. Zwei Buttons (`--radius-btn`), Fließtext in Space Grotesk auf `--color-cream` bei 85% Deckkraft.

**4. Produktraster**
`.snap-row` auf Mobil, Grid ab `md`. Karten auf `--color-surface`, `--radius-card`, `--color-border`.

**5. Restliche Sections**
`.hair-rule` als Abschnittstrenner, `.label-mono` für Eyebrows, `.float-slow` sehr sparsam für einzelne Dekor-Elemente.

---

## Notes

- **Der Look kostet fast nichts.** Sieben CSS-Klassen und eine kleine Komponente. Wer hier GSAP oder Lenis einplant, baut Gewicht ein, das die Vorlage selbst nicht hat.
- **`will-change: filter` auf `.painted-word` nicht übernehmen** — wird direkt danach per `filter: none !important` entwertet und erzeugt nur eine überflüssige Compositing-Ebene.
- **Reduced-Motion ist durchgehend abgedeckt** (`.scroll-trigger`, `.marquee-track`, `.float-slow`). Beim Nachbau mitnehmen, nicht nachrüsten.
- **`-webkit-text-stroke` ist unpräfigiert nicht verfügbar**, funktioniert aber in allen aktuellen Engines inkl. Firefox. Ohne Unterstützung fällt der Effekt sauber auf „Schrift ohne Kontur" zurück — kein Bruch.
- **Rechtliches:** Die Design-*Techniken* hier sind frei verwendbar. Die konkrete Kombination aus Palette, Schriftpaarung und Wortmarke ist Velours visuelle Identität — als Bauanleitung nutzen, nicht 1:1 übernehmen.
