# Insyte – SEO

Stand: 26.08.2026. Grundlage ist der Code und die Live-Seite unter
`insyte.ch`. Teil 1 hält fest, was umgesetzt ist und warum – Teil 2, was
offen bleibt.

---

## Teil 1: Umgesetzt

### Eine Domain statt zwei

`insyte.ch` antwortete mit `308 → https://insyte.ch/`, während alle
Canonicals auf die Nicht-www-Variante zeigten. Damit verwies die Seite auf
eine Adresse, die sofort weiterleitet – Ranking-Signale verteilten sich auf
zwei Domains statt sich zu bündeln.

Gewollt ist **`insyte.ch` ohne www**. Die Domain steht jetzt einmal in
`lib/site.ts` und wird überall von dort gezogen – Canonicals, `og:url`,
Sitemap, robots.txt, JSON-LD und OG-Bild.

```ts
export const SITE_URL = 'https://insyte.ch'
export function url(path = ''): string { … }
```

> ⚠️ **Diese Zeile und die Primärdomain in Vercel gehören zusammen.**
> Vercel leitet aktuell noch `insyte.ch → www.insyte.ch` um. Solange das so
> ist, zeigen die Canonicals wieder auf eine weiterleitende Adresse – derselbe
> Fehler, nur spiegelverkehrt. **Zuerst in Vercel umstellen, dann deployen.**

### Canonicals auf den Rechtsseiten

`/impressum` und `/datenschutz` definierten kein eigenes `alternates` und
erbten deshalb den Canonical des Root-Layouts – beide zeigten auf die
**Startseite**.

Beide Seiten stehen bewusst auf `robots: { index: false }`. Genau diese
Kombination ist das Problem: Ein `noindex` kann sich über das Canonical auf
dessen Ziel übertragen – hier also auf die Startseite. Beide haben jetzt einen
eigenen Canonical.

> **Regel für neue Seiten:** Jede neue `page.tsx` bekommt ein eigenes
> `alternates: { canonical: url('/pfad') }`. Ohne das erbt sie stillschweigend
> den der Startseite.

### robots.txt und sitemap.xml

Beide lieferten **404**. Jetzt erzeugt aus `app/robots.ts` und
`app/sitemap.ts`:

```
User-Agent: *
Allow: /
Host: https://insyte.ch
Sitemap: https://insyte.ch/sitemap.xml
```

Die Sitemap listet acht URLs und zieht die Projekte aus `lib/projects.ts` –
ein neues Projekt muss nicht an zwei Stellen nachgetragen werden.
`/impressum` und `/datenschutz` fehlen bewusst: eine Sitemap ist eine
Aufforderung zum Indexieren, zusammen mit `noindex` wäre das ein Widerspruch.

### Titles keywordzuerst

„Insyte" sucht niemand, der die Firma noch nicht kennt. Das erste Wort im
Title wiegt am schwersten – dort gehört der Begriff hin, nach dem gesucht wird.

| Seite | Vorher | Jetzt |
|-------|--------|-------|
| `/` | Insyte – Web & Software aus Zürich | Webentwicklung Zürich – Websites & Software für KMU \| Insyte |
| `/leistungen` | Leistungen – Insyte | Webdesign, Software & Wartung für KMU in Zürich \| Insyte |
| `/projekte` | Projekte – Insyte | Referenzen: Websites & Software-Projekte \| Insyte |
| `/team` | Team – Insyte | Über Insyte – Web-Entwickler in Zürich \| Insyte |
| `/kontakt` | Kontakt – Insyte | Kontakt – Webentwickler Zürich \| Insyte |

Die Descriptions waren inhaltlich schon gut und sind unverändert.

### Strukturierte Daten (JSON-LD)

Im ausgelieferten HTML stand kein einziges `application/ld+json`. Für einen
lokalen Anbieter war das der grösste ungenutzte Hebel – und es ist genau das,
woraus KI-Suchen (AI Overviews, Perplexity) ihre Anbieterlisten bauen.

| Schema | Ort | Zweck |
|--------|-----|-------|
| `ProfessionalService` | `app/layout.tsx`, alle Seiten | Firma, Adresse Zürich, Kontakt, Social-Profile |
| `Person` | `/team` | Mael Seewald, per `worksFor` mit der Firma verknüpft |
| `BreadcrumbList` | `/projekte/[id]` | Pfad statt nackter URL im Suchergebnis |
| `CreativeWork` | `/projekte/[id]` | Projekt als Werk, `creator` zeigt auf die Firma |

Die Verknüpfung läuft über `@id` (`…/#organization`). Ohne sie wären „Mael
Seewald" und „Insyte" für Google zwei zufällige Namen statt einer Entität.

### Projekt-Detailseiten

`/projekte` war **eine** URL für alle Projekte. Neu erzeugt
`app/projekte/[id]/page.tsx` eine statische Seite pro Projekt:

```
/projekte/smallbrawl
/projekte/paninicheck
/projekte/portfolio
```

Verlinkt aus dem Zeitstrahl (sonst wären sie nur über die Sitemap erreichbar
und bekämen kein internes Linkgewicht), untereinander über „Weitere Projekte",
und in der Sitemap.

⚠️ **Diese Seiten sind derzeit inhaltlich dünn.** Jedes Projekt hat in
`lib/projects.ts` nur zwei Sätze `description`. Die Struktur steht und
skaliert – aber ranken werden sie erst mit echtem Inhalt. Siehe Teil 2.

### Vorschaubild beim Teilen

Es gab kein `openGraph.images` – jeder Link auf LinkedIn oder WhatsApp
erschien als grauer Kasten. Das kostet Klicks, und Klicks sind ein
Ranking-Signal.

`app/opengraph-image.tsx` erzeugt jetzt ein 1200×630-Bild in den Brand-Farben,
gesetzt in Bricolage Grotesque. Da es in `app/` liegt, gilt es für alle Seiten;
einzelne Routen können später ein eigenes daneben legen. Dazu
`twitter: { card: 'summary_large_image' }`.

### Kleinere Korrekturen

- `lang="de"` → **`lang="de-CH"`**, stimmig zum `og:locale` (de_CH)
- **Adresse im Footer** auf jeder Seite, nicht nur im Impressum – Google
  gleicht Name/Adresse mit Business-Profil und Verzeichnissen ab
- Footer-Links auf **`next/link`** statt `<a href>` (Client-Navigation,
  Prefetch); externe Links bleiben korrekt `<a>` mit `rel="noopener"`
- `/team`: zwei Abschnittsüberschriften von `h3` auf **`h2`** – sie folgten
  direkt auf die `h1` und übersprangen eine Ebene

---

## Zwei Befunde, die sich nicht bestätigt haben

Der Vollständigkeit halber, damit niemand sie erneut „behebt":

**Die `h1` fehle auf drei Seiten** – falsch. Alle sieben Seiten haben eine
`h1`. Es sind `motion.h1`-Elemente von framer-motion, die eine Suche nach
`<h1` im Quelltext nicht findet. Im ausgelieferten HTML sind sie da.

**Das Porträt sei mit 2.3 MB ein Ladezeit-Problem** – falsch. `next/image` ist
korrekt eingesetzt, inklusive `sizes="112px"`. Ein echter Browser lädt
**5.4 KB WebP**:

```
Accept: image/avif,image/webp → content-type: image/webp, 5366 Bytes
```

Die 2.3 MB liegen nur als Quelldatei im Repo und erreichen keinen Besucher.

---

## Teil 2: Offen

Was hier steht, kann Code nicht lösen – es braucht deine Inhalte oder deine
Zugänge. Das sind gleichzeitig die Punkte mit der grössten Wirkung.

### 1. Google Search Console *(20 Min, Voraussetzung für alles)*

Domain verifizieren, Sitemap einreichen. Ohne das arbeitest du blind: du
siehst weder, für welche Begriffe du erscheinst, noch ob überhaupt indexiert
wird. **Erst danach lässt sich messen, ob der Rest wirkt.**

### 2. Google-Business-Profil *(30 Min, sehr hoher lokaler Hebel)*

Anlegen und verifizieren. Für „Webdesign Zürich" konkurrierst du mit
Agenturen, die lokale Signale voll ausspielen. Die Adresse im Footer und das
`ProfessionalService`-Schema sind die Vorarbeit dafür – das Profil ist der
Teil, der zählt. Wichtig: Name und Adresse **exakt** wie in `lib/site.ts`,
Abweichungen schwächen das Signal.

### 3. Projekt-Beschreibungen ausbauen *(je 1–2 Std)*

Die Detailseiten stehen, aber zwei Sätze pro Projekt sind zu wenig zum Ranken.
Pro Projekt 400–600 Wörter in `lib/projects.ts` bzw. als eigenes Feld:

- Ausgangslage: welches Problem gab es?
- Lösung: was wurde gebaut, welche Entscheidungen und warum?
- Ergebnis: was hat sich messbar geändert? (`result` ist im Typ schon
  vorgesehen und bei allen drei Projekten leer)

### 4. Eine Seite pro Leistung *(1–2 Tage)*

Statt einer Sammelseite je eine Seite auf einen Suchbegriff:

- `/leistungen/webdesign-zuerich`
- `/leistungen/webentwicklung`
- `/leistungen/individuelle-software`
- `/leistungen/wartung-support`

Je 400–800 Wörter: Problem, Vorgehen, Umfang, Preisrahmen, Beispielprojekt,
CTA. Das ist der grösste verbleibende Hebel – und der einzige Weg, für diese
Begriffe überhaupt zu erscheinen.

### 5. FAQ mit `FAQPage`-Schema *(halber Tag)*

6–8 echte Kundenfragen („was kostet eine Website", „wie lange dauert das").
Beantwortet Longtail-Suchen, kann direkt im Suchergebnis erscheinen, und
KI-Suchen zitieren Frage-Antwort-Paare bevorzugt. Braucht deine echten
Antworten inklusive Preisrahmen.

### 6. Backlinks *(laufend)*

Der stärkste Ranking-Faktor, den du nicht im Code steuerst. Realistisch:
„Umsetzung: Insyte" im Footer von Kundenseiten, local.ch, search.ch,
Schweizer Startup-Verzeichnisse, LinkedIn-Unternehmensseite, GitHub-Profil.

---

## Nach dem Deploy prüfen

```bash
curl -s https://insyte.ch/robots.txt
curl -s https://insyte.ch/sitemap.xml
curl -s https://insyte.ch/ | grep -o 'rel="canonical" href="[^"]*"'
```

Dazu im Browser:

- **Rich Results Test** (search.google.com/test/rich-results) – prüft das JSON-LD
- **OG-Vorschau** – Link in einen LinkedIn-Beitragsentwurf einfügen
- **PageSpeed Insights** – Ausgangswert festhalten, bevor sich mehr ändert
