import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FaqListe from '@/components/ui/FaqListe'
import LeistungAblauf from '@/components/sections/LeistungAblauf'
import {
  leistungBySlug,
  leistungSlugs,
  leistungen,
  preisText,
  ctaText,
} from '@/lib/leistungen'
import { url, SITE_URL, BUSINESS } from '@/lib/site'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return leistungSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const leistung = leistungBySlug(params.slug)
  if (!leistung) return {}

  const pfad = `/leistungen/${leistung.slug}`

  return {
    title: leistung.metaTitle,
    description: leistung.metaDescription,
    alternates: { canonical: url(pfad) },
    openGraph: {
      title: leistung.metaTitle,
      description: leistung.metaDescription,
      url: url(pfad),
      siteName: 'Insyte',
      locale: 'de_CH',
      type: 'website',
    },
  }
}

export default function LeistungPage({ params }: Props) {
  const leistung = leistungBySlug(params.slug)
  if (!leistung) notFound()

  const pfad = `/leistungen/${leistung.slug}`
  const andere = leistungen.filter((l) => l.slug !== leistung.slug)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Leistungen', item: url('/leistungen') },
      { '@type': 'ListItem', position: 3, name: leistung.name, item: url(pfad) },
    ],
  }

  /* `Service` mit Preis und Anbieter. `offers` braucht eine Währung, sonst
     ignoriert Google den Preis – und `priceSpecification` statt `price`,
     weil es ein Ab-Preis ist und kein Festbetrag. */
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: leistung.name,
    description: leistung.metaDescription,
    url: url(pfad),
    serviceType: leistung.name,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Schweiz' },
    /* Ohne Einstiegspreis kein `offers`: Ein Angebot ohne Betrag ist für
       Google ein unvollständiges Angebot und wird als Fehler gemeldet. */
    ...(leistung.preisAb !== null
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: leistung.preisAb,
              priceCurrency: 'CHF',
            },
          },
        }
      : {}),
  }

  /* Die Fragen stehen sichtbar auf der Seite – Voraussetzung dafür, dass
     Google sie als FAQ anerkennt. Ausgezeichnete Antworten, die der Besucher
     nicht sieht, gelten als Verstoss gegen die Richtlinien. */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: leistung.faq.map((f) => ({
      '@type': 'Question',
      name: f.frage,
      acceptedAnswer: { '@type': 'Answer', text: f.antwort },
    })),
  }

  return (
    <>
      <Navbar />
      {[breadcrumbSchema, serviceSchema, faqSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main>
        {/* Kopf */}
        <section className="bg-sand pt-28 pb-14 md:pt-40 md:pb-16 px-6">
          <div className="mx-auto max-w-3xl">
            <nav aria-label="Brotkrumen" className="label-mono text-erde/50 mb-6">
              <Link href="/leistungen" className="hover:text-gruen transition-colors">
                Leistungen
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gruen">{leistung.name}</span>
            </nav>

            <h1 className="font-display font-bold text-h1 text-wald text-balance mb-7">
              {leistung.h1}
            </h1>

            <p className="text-erde text-lg leading-relaxed mb-9 max-w-2xl">
              {leistung.lead}
            </p>

            <p className="font-display font-bold text-h3 text-wald">
              {preisText(leistung)}
            </p>
          </div>
        </section>

        {/* Ausgangslage */}
        <section className="bg-sand border-t border-leinen py-14 md:py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-7">
              Worum es geht
            </h2>
            <div className="flex flex-col gap-5">
              {leistung.problem.map((absatz, i) => (
                <p key={i} className="text-erde text-base leading-relaxed">
                  {absatz}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Vorgehen – nummeriert, weil es tatsächlich eine Reihenfolge ist */}
        <section className="bg-sand border-t border-leinen py-14 md:py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-9">
              So läuft es ab
            </h2>
            <LeistungAblauf schritte={leistung.vorgehen} />
          </div>
        </section>

        {/* Umfang und Preis */}
        <section className="bg-sand border-t border-leinen py-14 md:py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-7">
              Was enthalten ist
            </h2>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 mb-10">
              {leistung.enthalten.map((punkt) => (
                <li key={punkt} className="flex gap-3 text-erde text-base leading-relaxed">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2E7D4F"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mt-1.5 shrink-0"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {punkt}
                </li>
              ))}
            </ul>

            {/* Kein Kasten: Der Abschnitt endet, wo der Text endet, und der
                Button steht einfach darunter. Eine eingefärbte Fläche würde
                hier nur eine Trennung behaupten, die es inhaltlich nicht
                gibt. Der Preis steht im Button, nicht nochmal daneben. */}
            <p className="text-erde text-base leading-relaxed max-w-xl">
              {leistung.preisHinweis}
            </p>

            <Link href="/kontakt" className="btn-primary mt-9">
              {ctaText(leistung)}
            </Link>
          </div>
        </section>

        {/* FAQ – sichtbar, passend zum FAQPage-Schema oben */}
        <section className="bg-sand border-t border-leinen py-14 md:py-16 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h2 text-wald mb-9">
              Häufige Fragen
            </h2>
            <FaqListe fragen={leistung.faq} ersteOffen />

            <p className="text-erde text-base leading-relaxed mt-8">
              Allgemeine Fragen zu Preis, Dauer und Ablauf stehen auf der{' '}
              <Link href="/faq" className="text-gruen hover:underline">
                FAQ-Seite
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Andere Leistungen – interne Verlinkung */}
        <section className="bg-sand border-t border-leinen py-14 px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display font-bold text-h3 text-wald mb-6">
              Weitere Leistungen
            </h2>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {andere.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/leistungen/${l.slug}`}
                    className="group flex flex-wrap items-baseline gap-x-3 text-erde hover:text-gruen transition-colors"
                  >
                    <span className="font-medium">{l.name}</span>
                    <span className="label-mono text-erde/50 group-hover:text-gruen/70">
                      {preisText(l)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-wald py-16 md:py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold text-h2 text-white mb-5">
              Passt das zu deinem Vorhaben?
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
              <a href={`mailto:${BUSINESS.email}`} className="text-sand/70 hover:text-white transition-colors">
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
