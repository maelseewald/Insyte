import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { type Standort, standortBySlug } from '@/lib/standorte'
import { leistungen } from '@/lib/leistungen'
import { url, SITE_URL, BUSINESS } from '@/lib/site'

/**
 * Darstellung der Landingpages aus `lib/standorte.ts`.
 *
 * Bewusst kein dynamisches Segment auf oberster Ebene: Ein `app/[slug]`
 * würde jede unbekannte Adresse abfangen, bevor die 404-Seite greift. Die
 * drei Seiten haben darum je einen eigenen Ordner, der nur diese Komponente
 * mit seinem Datensatz aufruft.
 */
export default function StandortSeite({ standort }: { standort: Standort }) {
  const pfad = `/${standort.slug}`
  const verwandt = standort.verwandt
    .map((s) => standortBySlug(s))
    .filter((s): s is Standort => Boolean(s))

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: standort.eyebrow, item: url(pfad) },
    ],
  }

  /* Der Angebotskatalog fasst zusammen, was es hier gibt, und verbindet die
     Landingpage mit den Leistungen. Ohne ihn steht die Seite im Datenmodell
     allein da, obwohl sie dasselbe Angebot beschreibt. */
  const katalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen',
      itemListElement: leistungen.map((l) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: l.name,
          url: url(`/leistungen/${l.slug}`),
        },
        ...(l.preisAb !== null
          ? {
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: l.preisAb,
                priceCurrency: 'CHF',
              },
            }
          : {}),
      })),
    },
  }

  return (
    <>
      <Navbar />
      {[breadcrumbSchema, katalogSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        <section className="bg-sand pt-28 pb-14 md:pt-40 md:pb-16 px-6">
          <div className="mx-auto max-w-3xl">
            <p className="label-mono text-gruen mb-5">{standort.eyebrow}</p>
            <h1 className="font-display font-bold text-h1 text-wald text-balance mb-7">
              {standort.h1}
            </h1>
            <p className="text-erde text-lg leading-relaxed max-w-2xl">
              {standort.lead}
            </p>
          </div>
        </section>

        {standort.abschnitte.map((a) => (
          <section
            key={a.titel}
            className="bg-sand border-t border-leinen py-14 md:py-16 px-6"
          >
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display font-bold text-h2 text-wald mb-7">
                {a.titel}
              </h2>
              <div className="flex flex-col gap-5">
                {a.text.map((absatz, i) => (
                  <p key={i} className="text-erde text-base leading-relaxed">
                    {absatz}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Branchen: deckt Suchanfragen ab, die Leistung und Zielgruppe
            verbinden, ohne dass es je eine eigene Seite dafür braucht. */}
        <section className="bg-sand border-t border-leinen py-14 md:py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-9">
              {standort.branchenTitel}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {standort.branchen.map((b) => (
                <div key={b.titel}>
                  <h3 className="font-display font-bold text-h4 text-wald mb-2">
                    {b.titel}
                  </h3>
                  <p className="text-erde text-base leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verweist auf die Leistungen, statt sie hier zu wiederholen.
            Die Seite soll schlank bleiben; die Preise stehen ohnehin dort. */}
        <section className="bg-sand border-t border-leinen py-14 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-5">
              Was wir machen
            </h2>
            <p className="text-erde text-base leading-relaxed max-w-xl mb-7">
              Websites, Web-Apps und individuelle Software, dazu
              Suchmaschinenoptimierung sowie Hosting und Wartung. Was jeweils
              enthalten ist und was es kostet, steht bei den Leistungen.
            </p>
            <Link
              href="/leistungen"
              className="group inline-flex items-center gap-2 text-sm font-medium text-gruen"
            >
              Alle Leistungen ansehen
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
                className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </section>

        {verwandt.length > 0 && (
          <section className="bg-sand border-t border-leinen py-14 px-6">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display font-bold text-h3 text-wald mb-6">
                Auch interessant
              </h2>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {verwandt.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/${s.slug}`}
                      className="text-erde hover:text-gruen transition-colors font-medium"
                    >
                      {s.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="bg-wald py-16 md:py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold text-h2 text-white mb-5">
              Reden wir über dein Vorhaben
            </h2>
            <p className="text-sand/70 text-base mb-9">
              Schreib uns kurz, worum es geht. Wir melden uns innerhalb von
              24 Stunden, und das Erstgespräch kostet nichts.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Projekt starten
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
