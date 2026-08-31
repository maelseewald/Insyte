import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { faqGruppen, alleFragen } from '@/lib/faq'
import FaqListe from '@/components/ui/FaqListe'
import { leistungen } from '@/lib/leistungen'
import { url, SITE_URL, BUSINESS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Häufige Fragen zu Website, Preisen und Ablauf | Insyte',
  description:
    'Was kostet eine Website, wie lange dauert sie, wie läuft die Zusammenarbeit? Antworten auf die Fragen, die uns am häufigsten gestellt werden.',
  alternates: { canonical: url('/faq') },
  openGraph: {
    title: 'Häufige Fragen zu Website, Preisen und Ablauf | Insyte',
    description:
      'Was kostet eine Website, wie lange dauert sie, wie läuft die Zusammenarbeit?',
    url: url('/faq'),
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function FaqPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Häufige Fragen', item: url('/faq') },
    ],
  }

  /* Alle acht Fragen in einem Schema. Sie stehen sichtbar auf der Seite –
     ausgezeichnete Antworten, die der Besucher nicht sieht, wertet Google
     als Richtlinienverstoss. */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: alleFragen().map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  }

  return (
    <>
      <Navbar />
      {[breadcrumbSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        <section className="bg-sand pt-28 pb-14 md:pt-40 md:pb-16 px-6">
          <div className="mx-auto max-w-3xl">
            <p className="label-mono text-gruen mb-5">Häufige Fragen</p>
            <h1 className="font-display font-bold text-h1 text-wald text-balance mb-7">
              Was uns am häufigsten gefragt wird
            </h1>
            <p className="text-erde text-lg leading-relaxed max-w-2xl">
              Preis, Dauer, Ablauf: die Fragen, die in fast jedem Erstgespräch
              kommen, hier schon einmal beantwortet. Wenn deine nicht dabei
              ist, schreib uns einfach.
            </p>
          </div>
        </section>

        {faqGruppen.map((gruppe) => (
          <section
            key={gruppe.titel}
            className="bg-sand border-t border-leinen py-14 md:py-16 px-6"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display font-bold text-h2 text-wald mb-9">
                {gruppe.titel}
              </h2>
              <FaqListe
                fragen={gruppe.fragen}
                ersteOffen={gruppe === faqGruppen[0]}
              />
            </div>
          </section>
        ))}

        {/* Weiter in die Tiefe: jede Leistungsseite hat eigene Fragen */}
        <section className="bg-sand border-t border-leinen py-14 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h3 text-wald mb-3">
              Fragen zu einer bestimmten Leistung
            </h2>
            <p className="text-erde text-base leading-relaxed mb-7 max-w-xl">
              Auf jeder Leistungsseite stehen unten die Fragen, die genau dazu
              gestellt werden.
            </p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {leistungen.map((leistung) => (
                <li key={leistung.slug}>
                  <Link
                    href={`/leistungen/${leistung.slug}`}
                    className="group inline-flex items-center gap-2 text-erde hover:text-gruen transition-colors"
                  >
                    <span className="font-medium">{leistung.name}</span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-gruen transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
                    >
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-wald py-16 md:py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold text-h2 text-white mb-5">
              Deine Frage war nicht dabei?
            </h2>
            <p className="text-sand/70 text-base mb-9">
              Schreib uns, wir melden uns innerhalb von 24 Stunden. Das
              Erstgespräch kostet nichts.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Frage stellen
            </Link>
            <p className="text-sand/40 text-sm mt-7">
              Oder direkt:{' '}
              <a
                href={`mailto:${BUSINESS.email}`}
                className="text-sand/70 hover:text-white transition-colors"
              >
                {BUSINESS.email}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
