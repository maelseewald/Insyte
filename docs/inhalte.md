# Inhalte für die Insyte-Website

Checkliste aller Texte. Pro Eintrag: **Ort**, **Zweck**, **Aktuell** (Platzhalter)
und **Empfehlung**. Datei: gemeint ist, wo der Text im Code steht.

---

## 0. Zuerst entscheiden: Was ist Insyte?

Die aktuellen Texte gehen davon aus, dass Insyte eine **Agentur für lokale KMUs**
ist (Kundenprojekte, „Wir bringen lokale Unternehmen ins digitale Zeitalter").
Real bist du aktuell **Lernender Informatiker bei Adnovum** mit eigenen Projekten
(PaniniCheck, Portfolio).

**Entscheide, welche Richtung stimmt – das prägt fast alle Texte:**

- **A) Agentur / Dienstleister für KMUs** – du machst (oder willst) bezahlte
  Kundenprojekte. Dann passt die jetzige Sprache, aber du brauchst echte
  Kundenprojekte und ehrliche Zahlen.
- **B) Persönliche Marke / Showcase** – Insyte ist dein Entwickler-Profil und
  deine eigenen Projekte. Dann „Ich baue Web- & Softwareprojekte" statt „für
  lokale Unternehmen", und „Leistungen" wird zu „Was ich mache".
- **C) Mischung** – Eigenprojekte + offen für Aufträge.

Sag mir A/B/C, dann passe ich Tonalität, Hero, Leistungen und Use-Cases an.

---

## 1. Global / SEO

Datei: `app/layout.tsx`

| Feld | Aktuell | Empfehlung |
|---|---|---|
| Seitentitel (Browser-Tab) | „Insyte – Digitale Lösungen. Lokale Wirkung." | passt, ggf. an Richtung anpassen |
| Meta-Description (Google) | „Massgeschneiderte Websites und Softwarelösungen für KMUs in der Schweiz …" | 1 Satz, ~150 Zeichen, mit Keywords |
| OG-Titel (Social-Vorschau) | „Insyte – Web & Software für KMUs in der Schweiz" | analog zum Titel |
| Tagline | „Digitale Lösungen. Lokale Wirkung." | dein Claim – behalten oder neu |
| E-Mail | info@insyte.ch | echte Adresse bestätigen |
| Domain | insyte.ch | bestätigen |

---

## 2. Navigation & Footer

Dateien: `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`

| Feld | Aktuell | Empfehlung |
|---|---|---|
| Nav-Punkte | Leistungen · Projekte · Team · Kontakt | passt (Label „Leistungen" → „Angebot/Was ich mache" bei Richtung B) |
| Nav-Button | „Projekt starten" | passt |
| Footer-Tagline | „Digitale Lösungen. Lokale Wirkung." | = Claim |
| Footer-Copyright | „© 2025 Insyte – Alle Rechte vorbehalten" | **Jahr auf 2026 aktualisieren** |
| Social-Links Footer | LinkedIn (Firmenseite `company/insyte-ch`), Instagram (`insyte_ch`), GitHub (maelseewald) | Firmen-Profile |
| Social-Links Team-Karte | LinkedIn (`in/maelseewald`), GitHub (maelseewald), Portfolio (mael.5eewald.ch) | persönliche Profile |

---

## 3. Startseite

### 3.1 Hero — `components/sections/Hero.tsx`
| Feld | Aktuell |
|---|---|
| Eyebrow | „Web & Software · Schweiz" |
| Überschrift (H1) | „Wir bringen lokale Unternehmen ins digitale Zeitalter." |
| Untertitel | „Massgeschneiderte Websites und Softwarelösungen für KMUs – entwickelt mit Sorgfalt, erklärt in einfacher Sprache." |
| Buttons | „Leistungen entdecken" / „Kontakt aufnehmen" |
| Stats (3×) | „10+ Projekte" · „24h Antwortzeit" · „1 Ansprechpartner" |

→ **Wichtigster Text der Seite.** H1 = 1 starker Satz (was du für wen tust).
Stats: **echte Zahlen** (10+ Projekte stimmt aktuell nicht).

### 3.2 „Wann du uns brauchst" — `components/sections/Anwendungsfaelle.tsx`
| Feld | Aktuell |
|---|---|
| Überschrift | „Wann du uns brauchst" |
| Fall 1 | „Deine Website ist veraltet." / „Ein Auftritt von gestern schreckt Kunden ab." → **Websites** |
| Fall 2 | „Zu viel läuft von Hand." / „Wiederkehrende Aufgaben kosten dich täglich Stunden." → **Software & Apps** |
| Fall 3 | „Niemand kümmert sich um Updates." / „Sicherheitslücken und Ausfälle bleiben unbemerkt." → **Wartung & Support** |
| Link | „Alle Leistungen im Detail" |

→ 3× Problem (kurz, fett) + 1 Zeile Erklärung + zugeordnete Leistung. Bei
Richtung B ggf. ganz weglassen oder zu „Was ich gut kann" umbauen.

### 3.3 „Neueste Projekte" — `components/sections/Portfolio.tsx`
| Feld | Aktuell |
|---|---|
| Eyebrow / Titel | „Neueste Projekte" / „Werk-Index" |
| Link | „Alle Projekte ansehen" |

→ Inhalt kommt aus den Projektdaten (siehe 5.2). Zeigt die neuesten 3.

### 3.4 Teaser „Hinter Insyte" — `components/sections/UeberMich.tsx`
| Feld | Aktuell |
|---|---|
| Eyebrow | „Hinter Insyte" |
| Aussage | „Kein anonymer Anbieter – eine Person, die zuhört, mitdenkt und die Technik in einfacher Sprache erklärt." |
| Link | „Lern mich kennen" |

### 3.5 Abschluss-CTA — `app/page.tsx`
| Feld | Aktuell |
|---|---|
| Überschrift | „Bereit, dein Projekt zu starten?" |
| Untertitel | „Schreib mir – ich melde mich innerhalb von 24 Stunden." |
| Button | „Projekt starten" |

---

## 4. Leistungen-Seite (`/leistungen`)

Datei: `components/sections/LeistungenDetail.tsx`

### 4.1 Header
| Feld | Aktuell |
|---|---|
| Eyebrow | „Leistungen · Insyte" |
| H1 | „Drei Wege, dein Geschäft digital weiterzubringen." |
| Intro | „Ein Ansprechpartner, vom ersten Konzept bis zur laufenden Betreuung. Alles aus einer Hand, erklärt in einfacher Sprache." |

### 4.2 Die drei Leistungen (je Titel + Beschreibung + 4 Punkte „Das ist dabei")
**Websites** – „Professionelle, schnelle Webauftritte … von der Landingpage bis
zur Unternehmenswebsite."
- Individuelles Design, passend zu deiner Marke
- Optimiert für Google (SEO) und Mobilgeräte
- Schnelle Ladezeiten dank moderner Technik
- Einfache Pflege – oder ich übernehme sie

**Software & Apps** – „Individuelle Webanwendungen und Tools, die deinen
Geschäftsprozess automatisieren …"
- Analyse deiner Abläufe und Anforderungen
- Massgeschneiderte Web-Tools statt Standardsoftware
- Automatisierung wiederkehrender Aufgaben
- Anbindung an deine bestehenden Systeme

**Wartung & Support** – „Monatliche Betreuung deiner digitalen Infrastruktur …"
- Regelmässige Updates und Sicherheitschecks
- Backups und laufendes Monitoring
- Schnelle Hilfe bei Problemen
- Fester Ansprechpartner – kein Ticketsystem

→ Prüfe, ob du diese drei Leistungen **wirklich anbietest**. Sonst kürzen/ändern.

### 4.3 CTA
„Klingt nach dem, was du suchst?" / „Erzähl mir von deinem Vorhaben – ich melde
mich innerhalb von 24 Stunden." / Button „Projekt starten"

---

## 5. Projekte-Seite (`/projekte`)

### 5.1 Header & CTA — `components/sections/ProjektZeitstrahl.tsx`
| Feld | Aktuell |
|---|---|
| Eyebrow | „Projekte · Insyte" |
| H1 | „Was ich bisher gebaut habe." |
| Intro | „Scroll dich durch die Zeitachse – links die Projekte, rechts die Details zu jedem einzelnen." |
| CTA | „Dein Projekt als Nächstes?" / „Erzähl mir …" / „Projekt starten" |

### 5.2 Projektdaten — `lib/projects.ts` (die wichtigste Datei für dich)
Pro Projekt brauchst du:
| Feld | Bedeutung | Beispiel (PaniniCheck) |
|---|---|---|
| `name` | Projektname | „PaniniCheck" |
| `type` | Kurztyp | „Web-App" |
| `category` | „Website" oder „Software" | „Software" |
| `year` | Anzeigejahr | „2025" |
| `date` | Sortierung JJJJ-MM | „2025-06" |
| `tags` | 1–3 Stichworte/Tech | [„Next.js", „Web-App"] |
| `description` | 1–2 Sätze: was es ist | „Web-App rund um Panini-Sammelbilder …" |
| `result` | optional: Ergebnis/Nutzen | (leer – nur wenn ehrlich messbar) |
| `liveUrl` | optional: Live-Link | „https://paninicheck.insyte.ch/login" |
| `repoUrl` | optional: GitHub | **Repo-Name bestätigen** |

→ **Aktuell nur PaniniCheck.** Jedes weitere Projekt = ein Eintrag, erscheint
automatisch auf Startseite (neueste 3) und im Zeitstrahl. Bestätige mir Jahr,
Beschreibung, Tech und ob `repoUrl` (github.com/maelseewald/paninicheck) stimmt.

---

## 6. Team-Seite (`/team`)

Datei: `components/sections/Team.tsx`

| Feld | Aktuell |
|---|---|
| Eyebrow | „Team · Insyte" |
| H1 | „Eine Person, die wirklich zuhört." |
| Intro | „Kein Callcenter, keine Weiterleitungen, keine anonymen Tickets. Bei Insyte arbeitest du direkt mit der Person, die dein Projekt baut." |
| Badge | „Gründer & Entwickler" (alt.: „Lernender Informatiker") |
| Name | „Mael Seewald" |
| Bio | (neu, schon eingetragen – Adnovum, Lernen, Fussball) |
| Stats | 10+ Projekte · 24h Antwortzeit · 1 Ansprechpartner |
| CTA | „Lern mich kennen." / „Schreib mir …" / „Projekt starten" |

→ Stats hier echt machen. Badge entscheiden.

---

## 7. Kontakt-Seite (`/kontakt`)

Dateien: `app/kontakt/page.tsx`, `components/sections/Kontakt.tsx`

| Feld | Aktuell |
|---|---|
| Eyebrow | „Kontakt · Insyte" |
| H1 | „Lass uns über dein Projekt reden." |
| Intro | „Schreib mir – ich melde mich innerhalb von 24 Stunden. Kein Verkaufsgespräch …" |
| Label | „Direkt erreichbar" |
| Kontakt 1 | E-Mail → info@insyte.ch |
| Kontakt 2 | Antwortzeit → „Innerhalb von 24 Stunden" |
| Kontakt 3 | Ansprechpartner → „Direkt mit mir – kein Callcenter" |
| Formular-Labels | Name · E-Mail · Nachricht |
| Platzhalter | „Dein Name" · „deine@email.ch" · „Worum geht es bei deinem Projekt?" |
| Button | „Nachricht senden" |
| Erfolgsmeldung | „Danke! Deine Nachricht ist angekommen. Ich melde mich bald." |

→ Versand läuft über Resend; braucht `RESEND_API_KEY` und eine verifizierte
Absender-Domain. Absender aktuell: `noreply@insyte.ch`.

---

## 8. Rechtliches (Pflicht in CH)

### 8.1 Impressum — `app/impressum/page.tsx`
**Ausgefüllt.** Abschnitte: Kontaktadresse · Verantwortliche Person ·
Haftungsausschluss · Haftung für Links · Urheberrecht. Genannt ist Mael Seewald
als natürliche Person – kein HR-Eintrag, keine UID, weil hinter «Insyte» keine
Gesellschaft steht. Sobald ein Einzelunternehmen eingetragen wird, kommen
Firmenname und UID dazu.

### 8.2 Datenschutz — `app/datenschutz/page.tsx`
Aktuell Platzhalter. Mindestens: **wer du bist, welche Daten das Kontaktformular
erhebt (Name, E-Mail, Nachricht), wozu, dass nichts weitergegeben wird**, sowie
Hosting (Vercel) und E-Mail-Versand (Resend). Tipp: Generator wie der vom
Eidg. Datenschutzbeauftragten oder ein DSG/DSGVO-Generator nutzen.

---

## So gehst du vor
1. Punkt 0 entscheiden (A/B/C) – sag's mir.
2. Echte **Stats** + **Projektdaten** liefern.
3. **Impressum/Datenschutz** ausfüllen.
4. Den Rest (Hero, Leistungen) nach Richtung anpassen – mach ich gern mit dir.
