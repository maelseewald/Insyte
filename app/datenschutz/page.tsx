import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Datenschutz – Insyte',
  robots: { index: false, follow: false },
}

export default function Datenschutz() {
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
          Datenschutzerklärung
        </h1>
        <div className="text-erde text-base leading-relaxed space-y-4">
          <p>
            <strong>Verantwortliche Person:</strong>
            <br />
            Mael Seewald, Segantinistrasse 200, 8049 Zürich
            <br />
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
          </p>

          <h2 className="font-jakarta font-bold text-xl text-wald pt-4">
            1. Kontaktformular
          </h2>
          <p>
            Wenn du das Kontaktformular nutzt, werden folgende Daten erhoben:
            Name, E-Mail-Adresse und deine Nachricht. Diese Daten werden
            ausschliesslich zur Beantwortung deiner Anfrage verwendet und nicht
            an Dritte weitergegeben. Der E-Mail-Versand erfolgt über Resend
            (resend.com).
          </p>

          <h2 className="font-jakarta font-bold text-xl text-wald pt-4">
            2. Hosting
          </h2>
          <p>
            Diese Website wird über Vercel (vercel.com) gehostet. Vercel kann
            technische Zugriffsdaten (IP-Adresse, Zeitstempel) protokollieren.
            Weitere Informationen findest du in der Datenschutzerklärung von
            Vercel.
          </p>

          <h2 className="font-jakarta font-bold text-xl text-wald pt-4">
            3. Deine Rechte
          </h2>
          <p>
            Du hast jederzeit das Recht auf Auskunft, Berichtigung oder Löschung
            deiner gespeicherten Daten. Schreib dazu an{' '}
            <a href="mailto:info@insyte.ch" className="text-gruen">
              info@insyte.ch
            </a>
            .
          </p>

          <p className="text-sm text-erde/60 pt-2">
            Diese Erklärung gilt gemäss Schweizer Datenschutzgesetz (DSG).
          </p>
        </div>
      </div>
    </main>
  )
}
