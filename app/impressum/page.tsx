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
        <h1 className="font-display font-bold text-[clamp(28px,7vw,40px)] tracking-tight text-wald text-balance mb-8">
          Impressum
        </h1>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <p>Verantwortlich für den Inhalt dieser Website:</p>
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
            E-Mail:{' '}
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
          </p>
          <p className="text-sm text-erde/60">
            Diese Website ist ein privates Angebot von Mael Seewald. Es besteht
            kein Handelsregistereintrag.
          </p>
        </div>
      </div>
    </main>
  )
}
