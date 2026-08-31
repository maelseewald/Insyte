import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { BUSINESS } from '@/lib/site'

/**
 * Eine 404 ist keine Seite, die indexiert werden soll. Next.js liefert für
 * diese Datei automatisch den Statuscode 404, das ist das entscheidende
 * Signal an Google. Eine Seite, die «nicht gefunden» anzeigt, aber 200
 * zurückgibt, gilt als Soft 404 und landet als Fehler in der Search Console.
 */
export const metadata: Metadata = {
  title: 'Seite nicht gefunden | Insyte',
  // `canonical: null` hebt den Canonical des Root-Layouts auf. Ohne diese
  // Zeile erbt die 404 ihn und zeigt auf die Startseite: Damit erklärt eine
  // Seite, die Next.js auf `noindex` setzt, die Startseite zu ihrem Original.
  // Genau die Kombination, die auf den Rechtsseiten schon korrigiert wurde.
  alternates: { canonical: null },
  // Kein `robots` hier: Next.js setzt für not-found bereits `noindex`.
  // Beides zusammen ergäbe zwei robots-Meta-Tags im selben Dokument.
}

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-sand min-h-svh flex items-center px-6 pt-28 pb-16">
          <div className="mx-auto w-full max-w-3xl">
            {/* Die Zahl gross voran, damit auf einen Blick klar ist, dass
                hier ein Fehler steht und nicht eine gewollte Seite. */}
            <p
              className="font-display font-bold text-stat tabular-nums text-gruen leading-none mb-6"
              aria-hidden="true"
            >
              404
            </p>

            <h1 className="font-display font-bold text-h1 text-wald text-balance mb-7">
              Diese Seite gibt es nicht.
            </h1>

            <p className="text-erde text-lg leading-relaxed max-w-xl mb-10">
              Vielleicht hat sich die Adresse geändert, vielleicht ein
              Tippfehler. Von hier kommst du zurück:
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-10">
              <Link href="/" className="btn-primary">
                Zur Startseite
              </Link>
              <Link
                href="/projekte"
                className="text-erde hover:text-gruen transition-colors font-medium"
              >
                Projekte ansehen
              </Link>
              <Link
                href="/faq"
                className="text-erde hover:text-gruen transition-colors font-medium"
              >
                Häufige Fragen
              </Link>
            </div>

            <p className="text-erde/60 text-sm leading-relaxed">
              Du bist über einen Link hier gelandet, der eigentlich
              funktionieren sollte? Sag uns kurz Bescheid an{' '}
              <a
                href={`mailto:${BUSINESS.email}?subject=Toter%20Link%20auf%20insyte.ch`}
                className="text-gruen hover:underline"
              >
                {BUSINESS.email}
              </a>
              , dann reparieren wir ihn.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
