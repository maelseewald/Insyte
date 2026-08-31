import type { Metadata } from 'next'
import { url } from '@/lib/site'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum von Insyte',
  // Eigener Canonical, sonst wird der der Startseite geerbt – und mit
  // ihm könnte das noindex unten auf die Startseite durchschlagen.
  alternates: { canonical: url('/impressum') },
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <main className="min-h-screen bg-sand px-6 py-20 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-gruen text-sm hover:brightness-110 mb-8 block"
        >
          ← Zurück
        </Link>
        {/* Rechtsseiten laufen bewusst eine Stufe kleiner: "Datenschutz-
            erklärung" ist ein unteilbares Wort und würde in h1-Grösse auf
            dem Handy über den Rand laufen. */}
        <h1 className="font-display font-bold text-h2 text-wald text-balance mb-3">
          Impressum
        </h1>
        <p className="label-mono text-erde/50 mb-8">
          Angaben gemäss Art. 3 Abs. 1 lit. b UWG
        </p>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <h2 className="font-display font-bold text-h3 text-wald">
            Kontaktadresse
          </h2>
          <p>
            <strong>Mael Seewald</strong>
            <br />
            Segantinistrasse 200
            <br />
            8049 Zürich
            <br />
            Schweiz
          </p>
          <p>
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
            <br />
            <a href="tel:+41782093113" className="text-gruen">
              078 209 31 13
            </a>
          </p>

          <h2 className="font-display font-bold text-h3 text-wald pt-4">
            Verantwortliche Person
          </h2>
          <p>
            «Insyte» ist die Bezeichnung, unter der Mael Seewald Web- und
            Softwareprojekte umsetzt. Dahinter steht keine Gesellschaft,
            sondern eine natürliche Person: Verantwortlich für diese Website
            und alle darüber angebotenen Leistungen ist Mael Seewald
            persönlich. Es besteht kein Eintrag im Handelsregister und keine
            Unternehmens-Identifikationsnummer (UID).
          </p>

          <h2 className="font-display font-bold text-h3 text-wald pt-4">
            Haftungsausschluss
          </h2>
          <p>
            Die Inhalte dieser Website werden mit Sorgfalt erstellt. Für ihre
            Richtigkeit, Vollständigkeit und Aktualität wird dennoch keine
            Gewähr übernommen. Haftungsansprüche gegen Mael Seewald für
            Schäden materieller oder immaterieller Art, die aus dem Zugriff
            auf diese Website, aus ihrer Nutzung oder Nichtnutzung oder aus
            technischen Störungen entstehen, sind ausgeschlossen. Inhalte
            können jederzeit und ohne Ankündigung geändert oder entfernt
            werden.
          </p>

          <h2 className="font-display font-bold text-h3 text-wald pt-4">
            Haftung für Links
          </h2>
          <p>
            Diese Website verweist an einzelnen Stellen auf Websites Dritter.
            Deren Inhalte liegen ausserhalb meines Einflussbereichs, weshalb
            dafür keine Verantwortung übernommen wird. Massgebend sind allein
            die Bedingungen der jeweiligen Anbieter; der Zugriff auf solche
            Seiten erfolgt auf eigene Verantwortung.
          </p>

          <h2 className="font-display font-bold text-h3 text-wald pt-4">
            Urheberrecht
          </h2>
          <p>
            Texte, Bilder, Grafiken, Quellcode und übrige Dateien auf dieser
            Website sind urheberrechtlich geschützt und gehören Mael Seewald,
            soweit nicht ausdrücklich eine andere Rechteinhaberin oder ein
            anderer Rechteinhaber genannt ist. Jede Verwendung ausserhalb der
            gesetzlich erlaubten Fälle (insbesondere Vervielfältigung,
            Bearbeitung und Weiterverbreitung) bedarf der vorgängigen
            schriftlichen Zustimmung.
          </p>

          <p className="text-sm text-erde/60 pt-2">
            Fragen zu diesen Angaben? Schreib an{' '}
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  )
}
