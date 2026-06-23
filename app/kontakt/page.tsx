import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import Footer from '@/components/layout/Footer'
import Kontakt from '@/components/sections/Kontakt'

export const metadata: Metadata = {
  title: 'Kontakt – Insyte',
  description:
    'Projekt starten mit Insyte – schreib mir, ich melde mich innerhalb von 24 Stunden. Ein fester Ansprechpartner, kein Callcenter.',
  alternates: { canonical: 'https://insyte.ch/kontakt' },
  openGraph: {
    title: 'Kontakt – Insyte',
    description:
      'Projekt starten mit Insyte – Antwort innerhalb von 24 Stunden.',
    url: 'https://insyte.ch/kontakt',
    siteName: 'Insyte',
    locale: 'de_CH',
    type: 'website',
  },
}

export default function KontaktPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-sand pt-40 pb-16 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-gruen text-xs font-semibold uppercase tracking-[0.2em] mb-5">
              Kontakt · Insyte
            </p>
            <h1 className="font-jakarta font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl">
              Lass uns über dein Projekt reden.
            </h1>
            <p className="text-erde text-lg leading-relaxed max-w-xl">
              Schreib mir – ich melde mich innerhalb von 24 Stunden. Kein
              Verkaufsgespräch, sondern ein ehrlicher Austausch über dein
              Vorhaben.
            </p>
          </div>
        </section>

        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
