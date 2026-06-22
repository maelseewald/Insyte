import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Impressum – Insyte',
  robots: { index: false, follow: false },
}

export default function Impressum() {
  return (
    <main className="min-h-screen bg-sand px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-gruen text-sm hover:brightness-110 mb-8 block"
        >
          ← Zurück
        </Link>
        <h1 className="font-jakarta font-bold text-[40px] tracking-tight text-wald mb-8">
          Impressum
        </h1>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <p>
            <strong>Insyte</strong>
            <br />
            [Strasse und Hausnummer]
            <br />
            [PLZ Ort], Schweiz
          </p>
          <p>
            E-Mail:{' '}
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
          </p>
          <p className="text-sm text-erde/60">
            [Weitere Angaben gemäss Schweizer Recht]
          </p>
        </div>
      </div>
    </main>
  )
}
