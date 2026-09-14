import { NextResponse } from 'next/server'
import { url } from '@/lib/site'
import { leistungen } from '@/lib/leistungen'
import { standorte } from '@/lib/standorte'

/**
 * llms.txt nach der Konvention von llmstxt.org: eine kurze, strukturierte
 * Zusammenfassung der Seite für KI-Systeme, die Inhalte nicht rendern,
 * sondern nur den Text lesen. Leistungen und Standorte kommen aus denselben
 * Listen wie `sitemap.ts`, damit eine neue Seite nicht an zwei Stellen
 * nachgetragen werden muss.
 */
export function GET() {
  const leistungenListe = leistungen
    .map((l) => `- [${l.name}](${url(`/leistungen/${l.slug}`)}): ${l.metaDescription}`)
    .join('\n')

  const standorteListe = standorte
    .map((s) => `- [${s.h1}](${url(`/${s.slug}`)}): ${s.metaDescription}`)
    .join('\n')

  const text = `# Insyte

> Webagentur aus Zürich für Websites, Web-Apps, individuelle Software, SEO sowie Hosting und Wartung. Ein-Personen-Betrieb für KMU, Vereine und Unternehmen in der ganzen Schweiz.

Insyte baut Websites, Web-Apps und massgeschneiderte Software für kleine und mittlere Betriebe. Vom Erstgespräch bis zur Wartung ist dieselbe Person Ansprechpartner. Sitz ist Zürich Höngg, gearbeitet wird für Kundschaft im Kanton Zürich und in der ganzen Deutschschweiz. Websites beginnen bei CHF 1'500, Web-Apps bei CHF 2'000, individuelle Software bei CHF 3'000, Hosting und Wartung ab CHF 50 im Monat.

## Leistungen
${leistungenListe}

## Standorte
${standorteListe}

## Weitere Seiten
- [Projekte](${url('/projekte')}): Referenzprojekte und bisherige Arbeiten.
- [Team](${url('/team')}): Wer bei Insyte arbeitet.
- [FAQ](${url('/faq')}): Häufige Fragen zu Ablauf, Preisen und Vertrag.
- [Kontakt](${url('/kontakt')}): Kostenloses Erstgespräch vereinbaren.
`

  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
