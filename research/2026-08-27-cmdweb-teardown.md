# Site Teardown: cmdweb.ch

**URL:** https://cmdweb.ch/webdesign-zuerich
**Plattform:** Next.js (App Router, Turbopack), Cloudflare davor
**Datum:** 2026-08-27
**Warum analysiert:** Direkter Wettbewerber um „Webdesign Zürich" und
„Webagentur Zürich". Dieselbe Positionierung, dieselbe Zielgruppe, sogar
dasselbe Framework wie Insyte.

---

## Tech Stack (aus dem Quelltext bestätigt)

| Technologie | Beleg | Zweck |
|---|---|---|
| Next.js | 72 Treffer auf `/_next/`, `__NEXT_DATA__` | Framework, wie bei Insyte |
| Turbopack | `chunks/turbopack-*.js` | Build |
| React | Client-Komponenten | UI |
| Cloudflare | `/cdn-cgi/scripts/.../email-decode.min.js` | CDN, E-Mail-Verschleierung |
| Inter | `font-family: Inter, system-ui` | einzige Schrift |

Keine Animationsbibliothek gefunden. Kein GSAP, kein Framer Motion, kein
Lenis. Die Seite verzichtet auf Bewegung fast vollständig.

**Das ist die erste Erkenntnis:** Die Seite rankt ohne jeden Effekt. Ihr
Vorsprung liegt nicht in der Technik.

---

## Design System

### Farben

| Rolle | Wert |
|---|---|
| Text / Dunkel | `#1f1f1f` |
| Akzent (CTA) | `#f16b5c` (Korallrot) |
| Hintergrund | `#fef8f6` (warmes Weiss) |
| Akzent dunkel | `#e05a4a` |
| Sekundär | `#b2683f` |

Zwei CSS-Variablen insgesamt (`--cta`, `--external`). Kein Token-System,
Tailwind-Utilities direkt im Markup.

### Typografie

Eine einzige Schrift: **Inter**, mit `system-ui` als Fallback. Keine
Display-Schrift, keine zweite Familie.

Zum Vergleich: Insyte fährt vier Schriften (Bricolage Grotesque, Inter,
JetBrains Mono, Permanent Marker) und ein dokumentiertes Token-System.

---

## Effekte

| Effekt | Umsetzung | Cloneable |
|---|---|---|
| — | keine gefunden | — |

Statische Seite, serverseitig gerendert. Kein Scroll-Reveal, kein Parallax,
kein Smooth Scrolling, kein Custom Cursor.

---

## Wo die Seite tatsächlich stark ist

Nicht im Design. In der Struktur.

### 1. Eigene Seite pro Ort und Begriff

```
/webdesign-zuerich        ← diese Seite
/webagentur-zuerich       ← eigene Seite für den zweiten Begriff
/webdesign-volketswil     ← eigene Seite pro Ort
/services/webdesign       ← die Leistung generisch
/services/seo
/services/hosting
```

Das ist der Kern: **Leistung × Ort als eigene URL.** „Webdesign Zürich" und
„Webagentur Zürich" sind zwei Suchbegriffe, also zwei Seiten. Volketswil
bekommt eine eigene, obwohl es dieselbe Leistung ist.

### 2. Branchenabschnitte auf der Seite

Unter „Webdesign nach Branche im Kanton Zürich":

- Gastronomie
- Bau und Handwerk
- Selbstständige und Berater
- Fahrschulen, Coachings, Dienstleister

Damit deckt eine Seite zusätzlich „webdesign gastronomie zürich" und
Ähnliches ab, ohne dass es je eine eigene Seite braucht.

### 3. Umfang

**1195 Wörter**, 10 `h2`, 18 `h3`. Zum Vergleich: Die Insyte-Seite
`/leistungen/webdesign-zuerich` hat 682 Wörter.

Seitenaufbau von oben nach unten:

```
h1  Webdesign aus Zürich, persönlich umgesetzt
h2  Was Sie in Zürich von uns bekommen      (8 Unterpunkte)
h2  So läuft ein Projekt ab                 (4 Schritte)
h2  Eine Webagentur direkt aus dem Kanton Zürich
h2  Für wen wir arbeiten
h2  Referenzen aus der Region
h2  Webdesign nach Branche im Kanton Zürich (4 Branchen)
h2  Was Zürcher KMU wirklich brauchen
h2  Preise
h2  Bereit, in Zürich gefunden zu werden?
h2  Häufige Fragen zu Webdesign in Zürich
```

Der Ortsname steht in fünf von zehn Überschriften.

### 4. Strukturierte Daten

Deutlich umfangreicher als bei Insyte:

| Schema | Insyte | cmdweb |
|---|---|---|
| `ProfessionalService` | ✓ 17 Felder | ✓ 18 Felder |
| `Organization` | — | ✓ separat, 19 Felder |
| `WebSite` | — | ✓ |
| `Person` | ✓ 1 | ✓ 3 |
| `Service` | ✓ | ✓ |
| `FAQPage` | ✓ | ✓ 5 Fragen |
| `BreadcrumbList` | ✓ | ✓ |
| `hasOfferCatalog` | — | ✓ |

Felder, die cmdweb hat und Insyte fehlen: `telephone`, `geo`,
`contactPoint`, `foundingDate`, `numberOfEmployees`, `currenciesAccepted`,
`paymentAccepted`, `serviceArea`, `hasOfferCatalog`, `alternateName`,
`identifier`, `employee`, `founders`, `parentOrganization`.

### 5. Vertrauenssignale

Im Text gezählt: „Erstgespräch" 7×, „Google" 5×, „Bewertung" 3×,
„Referenz" 3×, „Telefon" 2×, „kostenlos" 2×.

Sie nennen Google-Bewertungen, eine Telefonnummer und Referenzen aus der
Region. Insyte hat davon nichts.

### 6. Preis im Title

```
Webdesign Zürich | Webagentur für KMU ab CHF 2'000
```

Beide Begriffe im Title, plus Preis. Die Description nennt Dauer
(„2–6 Wochen"), Eigentum am Code und ein Gratis-Erstgespräch.

Auffällig: Insyte startet bei CHF 1'500, cmdweb bei CHF 2'000. Der
Preisvorteil liegt bei Insyte und wird im Title bereits genannt.

---

## Was sich daraus für Insyte ergibt

Die Seite ist gestalterisch schwächer als die von Insyte: eine Schrift,
fünf Farben, keine Animation, kein Token-System. Sie rankt trotzdem, weil
sie drei Dinge tut, die Insyte nicht tut.

| Was | cmdweb | Insyte |
|---|---|---|
| Eigene Seite je Begriff | Webdesign **und** Webagentur | nur Webdesign |
| Eigene Seite je Ort | Zürich, Volketswil | keine |
| Branchen abgedeckt | 4 Abschnitte | keine |
| Wörter auf der Hauptseite | 1195 | 682 |
| Kundenreferenzen | 3 Portfolio-Seiten | 3 Eigenprojekte |
| Google-Bewertungen | erwähnt | keine |
| Telefonnummer | ja | keine |
| Blog | ja | keiner |

**Kein einziger dieser Punkte ist technisch.** Es ist alles Inhalt und
Struktur.

---

## Umsetzungsplan für Insyte

### Sofort, im Code

1. **`/leistungen/webagentur-zuerich`** als eigene Seite. Der Begriff steht
   heute genau zweimal auf der ganzen Insyte-Seite.
2. **Branchenabschnitt** auf `/leistungen/webdesign-zuerich`, analog zu
   cmdweb: Handwerk, Gastronomie, Beratung, Praxen.
3. **Schema erweitern:** `Organization` und `WebSite` getrennt vom
   `ProfessionalService`, dazu `hasOfferCatalog` mit den drei Paketen.
4. **Umfang** der Webdesign-Seite von 682 auf über 1000 Wörter.

### Braucht Angaben von Mael

5. **Telefonnummer** — steht nirgends, weder im Impressum noch im Schema.
6. **`geo`-Koordinaten** für Segantinistrasse 200.
7. **Google-Bewertungen** — cmdweb nennt sie, Insyte hat keine.
8. **Echte Kundenreferenzen** statt nur Eigenprojekten.

### Später

9. Ortsseiten für die Umgebung, sobald Zürich steht.
10. Blog.

---

## Notizen

- Die Seite nutzt Cloudflares E-Mail-Verschleierung. Für Insyte irrelevant,
  die Adresse steht ohnehin offen im Footer.
- Zwei JSON-LD-Blöcke liessen sich nicht parsen, vermutlich mit Kommentaren
  oder Sonderzeichen. Der Rest war lesbar.
- Preise: cmdweb ab CHF 2'000, Insyte ab CHF 1'500. Dieser Vorteil steht
  bereits im Title und sollte auch in der Description stehen.
