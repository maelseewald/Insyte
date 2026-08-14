import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
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
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-sand pt-40 pb-16 px-6">
          <div className="mx-auto max-w-6xl">
            <p className="label-mono text-gruen mb-5">
              Kontakt
            </p>
            <h1 className="font-display font-bold text-[clamp(36px,5.5vw,60px)] leading-[1.04] tracking-tight text-wald mb-7 max-w-3xl">
              Lass uns über dein Projekt reden.
            </h1>
            <p className="text-erde text-lg leading-relaxed max-w-xl">
              Schreib uns – wir melden uns innerhalb von 24 Stunden. Kein
              Verkaufsgespräch, kein Druck. Nur ein ehrliches Gespräch darüber,
              ob und wie wir helfen können.
            </p>
          </div>
        </section>

        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
