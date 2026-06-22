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
            Der Schutz deiner persönlichen Daten ist uns wichtig. Diese
            Datenschutzerklärung informiert dich über die Verarbeitung
            personenbezogener Daten auf dieser Website.
          </p>
          <h2 className="font-jakarta font-bold text-xl text-wald pt-4">
            Kontaktformular
          </h2>
          <p>
            Wenn du das Kontaktformular verwendest, werden die eingegebenen
            Daten (Name, E-Mail, Nachricht) ausschliesslich zur Bearbeitung
            deiner Anfrage verwendet und nicht an Dritte weitergegeben.
          </p>
          <p className="text-sm text-erde/60">
            [Vollständige Datenschutzerklärung gemäss DSG/DSGVO ergänzen]
          </p>
        </div>
      </div>
    </main>
  )
}
