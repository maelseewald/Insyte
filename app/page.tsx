import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import LeistungenWortmarken from '@/components/sections/LeistungenWortmarken'
import Portfolio from '@/components/sections/Portfolio'
import UeberMich from '@/components/sections/UeberMich'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LeistungenWortmarken />
        <Portfolio />
        <UeberMich />

        {/* Closing CTA */}
        <section className="bg-wald py-24 px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display font-bold text-h2 text-white mb-5">
              Hast du ein Projekt im Kopf?
            </h2>
            <p className="text-sand/70 text-base mb-9">
              Schreib uns – wir schauen es uns an und melden uns innerhalb von
              24 Stunden.
            </p>
            <Link href="/kontakt" className="btn-primary">
              Projekt starten
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
