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

> ✅ **Erledigt, geprüft am 31.08.2026.** Vercel leitet inzwischen richtig
> herum um: `www.insyte.ch` antwortet mit `308` auf `https://insyte.ch/`,
> `insyte.ch` selbst mit `200`. Das deckt sich mit `SITE_URL`. Wer die Zeile in
> `lib/site.ts` ändert, muss die Primärdomain in Vercel mit ändern, sonst
> zeigen die Canonicals wieder auf eine weiterleitende Adresse.

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

## Teil 2: Inhalt – geschrieben, aber ungeprüft

Fünf Leistungsseiten, drei Projektgeschichten und 25 FAQ-Einträge sind
umgesetzt. **Alles davon ist von Claude geschrieben und muss von dir
gegengelesen werden, bevor es bleibt.** Zwei Punkte besonders.

### Angebot und Preise

Drei Pakete auf `/leistungen`, fünf Seiten darunter. Das Angebot ist
gebündelt, die Seiten bleiben getrennt: Eine URL kann nur einen Suchbegriff
gut bedienen, drei URLs bedienen drei.

| Paket | Preis | Seiten |
|-------|-------|--------|
| Websites, Web-Apps & Software | ab CHF 1'500 | `/webdesign-zuerich` (1'500), `/webentwicklung` (2'000), `/individuelle-software` (3'000) |
| SEO | Preis nach Gespräch | `/seo-zuerich` |
| Hosting & Wartung | ab CHF 50 pro Monat | `/wartung-support` |

Wartung enthält Hosting und eine Stunde Arbeit pro Monat, jede weitere zu
CHF 80 (`STUNDENSATZ` in `lib/leistungen.ts`).

Der Preis auf der Übersichtskarte ist der **günstigste** der verlinkten
Leistungen, berechnet statt fest verdrahtet. Sonst hinge die Angabe an der
Reihenfolge im Array und wäre nach der nächsten Umstellung still falsch.

`preisAb` ist `number | null`. Bei `null` entfällt der `offers`-Block im
`Service`-Schema, weil ein Angebot ohne Betrag von Google als Fehler
gemeldet wird.

**Alle Preise stammen von Mael.** Nur die erste Fassung war teilweise
geraten; inzwischen sind alle bestätigt.

### ⚠️ Zusagen, die jetzt öffentlich sind

Damit die Seiten nicht nach Broschüre klingen, stehen konkrete Versprechen
darin. Manche kannten deine Seite schon, andere sind neu. **Jedes davon ist
eine Zusage an Kunden – streich, was du nicht halten willst:**

| Zusage | Wo | Vorher schon da? |
|--------|-----|------------------|
| Antwort innerhalb von 24 Stunden | alle Seiten | ja |
| Fester Ansprechpartner, kein Ticketsystem | Wartung | ja |
| Erstgespräch kostenlos, eine Stunde, unverbindlich | Webdesign | **neu** |
| Website in 2 bis 4 Wochen live | Webdesign, FAQ | an Ziffer 4 des Werkvertrags angeglichen |
| Wartung monatlich kündbar, keine Mindestlaufzeit | Wartung | **neu** |
| Kleine Inhaltsänderungen ohne Zusatzrechnung | Wartung | **neu** |
| Änderungen am selben oder nächsten Arbeitstag | Wartung | **neu** |
| Nutzungsrecht am projektspezifischen Code, Unterbau ausgenommen | Entwicklung, Software | nach Ziffer 7 des Werkvertrags gefasst |
| Festpreis statt offener Stundenrechnung | Entwicklung, Software | **neu** |
| Daten auf Servern in CH oder EU, auf Wunsch | Entwicklung | **neu** |
| Weiterleitungen von der alten Website | Webdesign | **neu** |

Stand 31.08.2026: Jede Zeile wurde gegen den Text in `lib/` geprüft. Zwei
Zusagen gingen weiter als der Werkvertrag und wurden auf ihn zurückgeführt
(Dauer und Rechte am Code), eine stand nur in dieser Tabelle und in keinem
Text (Feedbackrunde nach dem Livegang) und ist hier entfernt.

Die Wartungsseite nennt Reaktionszeiten («im Regelfall am selben oder nächsten
Arbeitstag»). Das steht nicht im Widerspruch zum Werkvertrag: Ziffer 6 nimmt
Wartung ausdrücklich aus und verweist auf ein eigenes Modell, und der
Ablaufschritt «Vertrag» auf der Seite sagt, dass Umfang, Preis und
Reaktionszeit dort schriftlich festgehalten werden.

### Was wo liegt

| Was | Datei | Umfang |
|-----|-------|--------|
| Fünf Leistungsseiten | `lib/leistungen.ts` | rund 700 Wörter je Seite |
| Seitenvorlage | `app/leistungen/[slug]/page.tsx` | Service- und FAQPage-Schema |
| Projektgeschichten | `lib/projects.ts`, Feld `story` | siehe unten |
| FAQ je Leistung | in `lib/leistungen.ts`, 3 bis 4 Fragen je Seite | 16 |
| Allgemeine FAQ-Seite | `lib/faq.ts`, `app/faq/page.tsx` | 9 |
| Aufklapp-Komponente | `components/ui/FaqListe.tsx` | – |

### Abläufe: gleiche Form, eigener Inhalt

Jede Bau-Leistung hat sechs Schritte in derselben Abfolge, aber mit Inhalt,
der zur Sache passt. Ein gemeinsamer Ablauf war zwischenzeitlich eingebaut
und wieder verworfen: Bei einer Website geht es um Seiten, Texte und Bilder,
bei einer Anwendung um Funktionen, Rollen und Daten. Derselbe Text wäre für
zwei der drei falsch gewesen.

| # | Website | Web-App | Software |
|---|---------|---------|----------|
| 01 | Gespräch | Gespräch | Mitschauen |
| 02 | Struktur und Text | Funktionen festlegen | Funktionen und Abgrenzung |
| 03 | Vertrag aufsetzen | Vertrag aufsetzen | Vertrag aufsetzen |
| 04 | Gestaltung und Umsetzung | Kleinste nützliche Fassung | In Etappen bauen |
| 05 | Liveschaltung | In Betrieb nehmen | Daten übernehmen und einführen |
| 06 | Hosting und Wartung *(optional)* | Hosting und Wartung *(optional)* | Hosting und Wartung *(optional)* |

Schritt 03 und 06 sind wortgleich und stehen als `VERTRAG` und
`WARTUNG_OPTIONAL` einmal in `lib/leistungen.ts`. Der Rest je Leistung eigen.

Wartung hat einen eigenen Ablauf mit sieben Schritten, SEO einen mit fünf.

Der optionale Schritt ist dreifach erkennbar: gestrichelte Verbindung,
gestrichelter Punktrand, Kennzeichnung neben der Überschrift. Aufgedeckt wird
über `clipPath` statt `scaleY`, weil das Strichmuster beim Skalieren
gestaucht würde.

### Ansprache vereinheitlicht

In den Antworten stand teilweise «ich», in einem Satz sogar neben «wir». Die
Seite spricht durchgehend als **wir**; 15 Stellen angeglichen. In den Fragen
bleibt «ich» stehen, dort spricht der Kunde («Kann ich die Inhalte ändern?»).

### Keine erfundenen Flächen

Der Preishinweis stand in einem eingefärbten Kasten, den es in
`docs/design-standards.md` gar nicht gibt. Entfernt: Der Abschnitt endet
jetzt, wo der Text endet, und der Button steht darunter. `salbei` bleibt dem
vorbehalten, wofür die Standards es vorsehen, nämlich Icon-Flächen und
Tag-Pills.

Der Preis stand ausserdem dreimal auf der Seite (Kopf, Kasten, Button).
Jetzt zweimal: einmal als Angabe im Kopf, einmal im Button.

### Formulierungen, die nicht bleiben durften

Zwei Regeln aus der Durchsicht, die für alle künftigen Texte gelten:

**Keine Gedankenstriche.** Der `–` ist ein Erkennungsmerkmal maschinell
geschriebener Texte. Sätze stattdessen mit Punkt, Komma, Doppelpunkt oder
Klammern gliedern. Betrifft auch Meta-Titles im Muster «Thema – Untertitel |
Insyte»; dort steht jetzt ein Doppelpunkt. Code-Kommentare sind ausgenommen.

**Keine Aussagen über Handarbeit.** «Von Hand gebaut» stand in der
Webdesign-Beschreibung und ist schlicht nicht wahr, weil die Umsetzung
AI-gestützt läuft. Ersetzt durch «auf deinen Betrieb zugeschnitten»: Das sagt
etwas über das Ergebnis statt über die Herstellung und stimmt unabhängig vom
Werkzeug.

Geprüft und unverändert geblieben sind «kein Baukasten», «kein Template»,
«individuelles Design» und «schnelle Ladezeiten». Die bleiben zutreffend.

### FAQ: 25 Fragen, keine doppelt

`/faq` beantwortet die übergreifenden Fragen (Preis, Dauer, Zusammenarbeit),
die Leistungsseiten die je spezifischen. **Die Fragen überschneiden sich
bewusst nicht:** Dieselbe Frage-Antwort mit `FAQPage` auf zwei Seiten
auszuzeichnen ist Duplikat – Google sucht sich eine davon aus, und die beiden
Seiten ranken gegeneinander statt miteinander. Geprüft, Schnittmenge ist leer.

Darstellung über natives `<details>`/`<summary>` statt einer React-Komponente:

- Die Seiten bleiben **Server-Komponenten**, kein `use client`
- Tastaturbedienung und Semantik kommen vom Browser
- Der Antworttext steht **auch zugeklappt im HTML** – Bedingung dafür, dass
  die `FAQPage`-Auszeichnung überhaupt gilt. Antworten, die erst JavaScript
  erzeugt, erkennt Google nicht an
- Immer nur eine Frage offen: `name="faq"` auf allen `<details>`. Sie
  verhalten sich damit wie Radio-Buttons. Ältere Browser ignorieren das
  Attribut und lassen mehrere offen – ein harmloser Fehlschlag

Die Stile liegen als `.faq-item` in `app/globals.css`, passend zur Regel aus
den Design-Standards, dass wiederverwendbare Komponentenklassen dorthin
gehören.

Verlinkt sind die vier Seiten aus den drei Karten auf `/leistungen`. Die
Karte «Web-Apps & Software» deckt zwei davon ab und bekommt darum zwei
benannte Links statt eines mehrdeutigen «Mehr dazu» – ein viertes Kärtchen
hätte das `md:grid-cols-3`-Raster mit seinen Trennlinien gebrochen.

Neue Auszeichnung auf den Leistungsseiten: `Service` mit `priceSpecification`
(Ab-Preis, nicht Festbetrag) und `FAQPage`. Die Fragen stehen sichtbar auf der
Seite – Voraussetzung dafür, dass Google sie anerkennt. Ausgezeichnete
Antworten, die der Besucher nicht sieht, gelten als Richtlinienverstoss.

### Projektgeschichten: eine ist vollständig, zwei sind kurz

| Projekt | Wörter | Grund |
|---------|--------|-------|
| SmallBrawl | 567 | Live-Seite gab viel her: Canvas, Vite, Login per E-Mail-Code, erzwungenes Querformat, Ausrüstung, Profilstatistik |
| PaniniCheck | 248 | Repository nicht abrufbar, keine Live-Seite – nur die zwei Sätze aus `lib/projects.ts` als Grundlage |
| Portfolio | 200 | Die Seite rendert client-seitig, im HTML steht nur „Mael Seewald" |

Die beiden kurzen sind bewusst nicht auf Länge gestreckt. Erfundene technische
Details auf einer Referenzseite fallen im Kundengespräch auf – und dort
kosten sie mehr, als die Wörter auf Google einbringen.

**Damit sie tragen:** erzähl mir zu PaniniCheck und dem Portfolio, was du
tatsächlich gebaut und entschieden hast, dann schreibe ich sie fertig.

### Neues Feld `story`

`description` bleibt kurz – daran hängen die Karten im Zeitstrahl und die
Meta-Description. Die lange Fassung steht getrennt in `story` als Abschnitte
mit Titel, die auf der Detailseite zu `h2` werden.

```ts
story?: { titel: string; text: string[] }[]
```

---

## Teil 3: Offen

Was hier steht, kann Code nicht lösen – es braucht deine Zugänge.

### 1. Google-Business-Profil *(30 Min, sehr hoher lokaler Hebel)*

Auf `business.google.com` anlegen und verifizieren. Für „Webdesign Zürich"
konkurrierst du mit Agenturen, die lokale Signale voll ausspielen. Name und
Adresse **exakt** wie in `lib/site.ts`. Segantinistrasse 200 ist eine
Privatadresse – Google lässt dich die Adresse verbergen und stattdessen ein
Einzugsgebiet angeben. Für einen Ein-Personen-Betrieb ohne Ladenlokal ist das
der richtige Weg.

### 2. Search Console: neue Seiten einreichen *(10 Min)*

Sieben URLs sind neu. Die Sitemap meldet sie, schneller geht es über
*URL-Prüfung → Indexierung beantragen*.

### 3. Backlinks *(laufend)*

Der stärkste Ranking-Faktor ausserhalb des Codes. „Umsetzung: Insyte" im
Footer von Kundenseiten, `local.ch`, `search.ch`, Schweizer
Startup-Verzeichnisse, LinkedIn-Unternehmensseite, GitHub-Profil.

### 4. Monatlich in die Search Console *(15 Min)*

Für welche Begriffe erscheinst du? Wo stehst du auf Position 8–20 – dort
lohnt Nachbessern am meisten. Welche Seiten sind nicht indexiert?

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
