'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Independent, self-completing reveal — no fragile variant propagation.
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

const STATS = ['10+ Projekte', 'Schweizweit', '1 Ansprechpartner']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-sand flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.p
          {...reveal(0.05)}
          className="text-gruen text-xs font-semibold uppercase tracking-[0.24em] mb-7"
        >
          Web &amp; Software · Schweiz
        </motion.p>

        <motion.h1
          {...reveal(0.12)}
          className="font-jakarta font-bold text-[clamp(38px,7vw,68px)] leading-[1.04] tracking-[-0.03em] text-wald text-balance mb-8"
        >
          Wir bringen lokale Unternehmen ins digitale Zeitalter.
        </motion.h1>

        <motion.p
          {...reveal(0.22)}
          className="mx-auto max-w-xl text-erde text-lg leading-relaxed mb-10"
        >
          Massgeschneiderte Websites und Softwarelösungen für KMUs – entwickelt
          mit Sorgfalt, erklärt in einfacher Sprache.
        </motion.p>

        <motion.div
          {...reveal(0.32)}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link href="/leistungen" className="btn-primary">
            Leistungen entdecken
          </Link>
          <a href="#kontakt" className="btn-secondary">
            Kontakt aufnehmen
          </a>
        </motion.div>

        <motion.div
          {...reveal(0.42)}
          className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-leinen pt-7"
        >
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-4">
              <span className="font-jakarta font-bold text-sm text-wald">
                {stat}
              </span>
              {i < STATS.length - 1 && (
                <span className="text-leinen select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
