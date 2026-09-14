import { NextResponse } from 'next/server'
import { url, BUSINESS } from '@/lib/site'
import { leistungen, preisText } from '@/lib/leistungen'
import { standorte } from '@/lib/standorte'
import { faqGruppen } from '@/lib/faq'

/**
 * Ausführliche Variante von `llms.txt` nach der Konvention von llmstxt.org:
 * statt nur Links der volle Seiteninhalt inline, damit ein KI-System ihn
 * lesen kann, ohne jede Seite einzeln abzurufen. Die Inhalte kommen aus
 * denselben Listen wie die Leistungs- und Standortseiten selbst, damit ein
 * neuer Text nicht doppelt gepflegt werden muss.
 */
export function GET() {
  const leistungenText = leistungen
    .map((l) => {
      const problem = l.problem.map((p) => `- ${p}`).join('\n')
      const enthalten = l.enthalten.map((e) => `- ${e}`).join('\n')
      const faq = l.faq
        .map((f) => `**${f.frage}**\n${f.antwort}`)
        .join('\n\n')
      return `### ${l.h1}

URL: ${url(`/leistungen/${l.slug}`)}
Preis: ${preisText(l)}${l.preisHinweis ? ` (${l.preisHinweis})` : ''}

${l.lead}

Ausgangslage:
${problem}

Enthalten:
${enthalten}

Fragen zu ${l.name}:

${faq}`
    })
    .join('\n\n---\n\n')

  const standorteText = standorte
    .map((s) => {
      const abschnitte = s.abschnitte
        .map((a) => `**${a.titel}**\n${a.text.join('\n\n')}`)
        .join('\n\n')
      const branchen = s.branchen
        .map((b) => `- ${b.titel}: ${b.text}`)
        .join('\n')
      return `### ${s.h1}

URL: ${url(`/${s.slug}`)}

${s.lead}

${abschnitte}

${s.branchenTitel}:
${branchen}`
    })
    .join('\n\n---\n\n')

  const faqText = faqGruppen
    .map((gruppe) => {
      const fragen = gruppe.fragen
        .map((f) => `**${f.frage}**\n${f.antwort}`)
        .join('\n\n')
      return `### ${gruppe.titel}\n\n${fragen}`
    })
    .join('\n\n')

  const text = `# Insyte

> Webagentur aus Zürich für Websites, Web-Apps, individuelle Software, SEO sowie Hosting und Wartung. Ein-Personen-Betrieb für KMU, Vereine und Unternehmen in der ganzen Schweiz.

## Über Insyte

Insyte baut Websites, Web-Apps und massgeschneiderte Software für kleine und mittlere Betriebe. Vom Erstgespräch bis zur Wartung ist dieselbe Person Ansprechpartner, es gibt kein Ticketsystem und keine wechselnden Projektleiter.

Rechtsform: Einzelunternehmen von ${BUSINESS.legalName}.
Adresse: ${BUSINESS.street}, ${BUSINESS.postalCode} ${BUSINESS.city}, Schweiz.
Telefon: ${BUSINESS.phoneDisplay}
E-Mail: ${BUSINESS.email}
Website: ${url()}

## Leistungen

${leistungenText}

## Standorte

${standorteText}

## Häufige Fragen

${faqText}

## Weitere Seiten

- [Projekte](${url('/projekte')}): Referenzprojekte und bisherige Arbeiten.
- [Team](${url('/team')}): Wer bei Insyte arbeitet.
- [Kontakt](${url('/kontakt')}): Kostenloses Erstgespräch vereinbaren.
`

  return new NextResponse(text, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
