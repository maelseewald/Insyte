'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import Typewriter, { type TypewriterSegment } from '@/components/ui/Typewriter'

// Independent, self-completing reveal — no fragile variant propagation.
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const, delay },
})

const HEADLINE: TypewriterSegment[] = [
  { text: 'Wir bauen Websites und Software – für ' },
  { text: 'eigene Ideen', painted: true },
  { text: ' und dein Unternehmen.' },
]

const STATS = ['2 Projekte', '24h Antwortzeit', 'Aus Zürich']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-sand flex flex-col items-center justify-center px-6 pt-28 pb-16 text-center"
    >
      <div className="mx-auto w-full max-w-3xl">
        <motion.p
          {...reveal(0.03)}
          className="label-mono text-gruen mb-7"
        >
          Web &amp; Software · Zürich
        </motion.p>

        {/* Kein reveal(): die Überschrift tippt sich selbst ein. Die übrigen
            Elemente warten nicht darauf, sie laufen parallel hoch. */}
        <h1 className="font-display font-bold text-[clamp(38px,7vw,68px)] leading-[1.04] tracking-[-0.03em] text-wald text-balance mb-8">
          <Typewriter segments={HEADLINE} startDelay={0.07} />
        </h1>

        <motion.p
          {...reveal(0.12)}
          className="mx-auto max-w-xl text-erde text-lg leading-relaxed mb-10"
        >
          Eine junge Webagentur aus Zürich. Wir entwickeln eigene Produkte –
          und helfen Unternehmen, ihre Ideen digital umzusetzen.
        </motion.p>

        <motion.div
          {...reveal(0.17)}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link href="/projekte" className="btn-primary">
            Unsere Projekte
          </Link>
          <Link href="/kontakt" className="btn-secondary">
            Kontakt aufnehmen
          </Link>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="mx-auto mt-16 flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-leinen pt-7"
        >
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-4">
              <span className="font-display font-bold text-sm text-wald">
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
