'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import Typewriter, { type TypewriterSegment } from '@/components/ui/Typewriter'
import WindowStack from '@/components/ui/WindowStack'

// Independent, self-completing reveal — no fragile variant propagation.
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const, delay },
})

// Nur der Marker-Akzent wird geschrieben — der gesetzte Teil erscheint
// zusammen mit der Überschrift.
const HEADLINE: TypewriterSegment[] = [
  { text: 'Erwecke deine Idee ' },
  { text: 'zum Leben', painted: true, typed: true },
]

const STATS = ['2 Projekte', '24h Antwortzeit', 'Aus Zürich']

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-sand flex items-center px-6 pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[48fr_52fr] lg:gap-10">
        {/* Textspalte — linksbündig ab lg, darunter zentriert */}
        <div className="text-center lg:text-left">
          <motion.p {...reveal(0.03)} className="label-mono text-gruen mb-7">
            Web &amp; Software · Zürich
          </motion.p>

          {/* Die Überschrift blendet als Ganzes ein; der Marker-Akzent darin
              schreibt sich danach. Sein startDelay liegt hinter der Einblendung,
              sonst wäre er schon sichtbar, bevor er geschrieben wird. */}
          <motion.h1
            {...reveal(0.07)}
            className="font-display font-bold text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.03em] text-wald text-balance mb-8"
          >
            <Typewriter segments={HEADLINE} startDelay={0.42} step={0.06} />
          </motion.h1>

          <motion.p
            {...reveal(0.12)}
            className="mx-auto max-w-xl text-erde text-lg leading-relaxed mb-10 lg:mx-0"
          >
            Eine junge Webagentur aus Zürich. Wir entwickeln eigene Produkte –
            und helfen Unternehmen, ihre Ideen digital umzusetzen.
          </motion.p>

          <motion.div
            {...reveal(0.17)}
            className="flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <Link href="/projekte" className="btn-primary">
              Referenzen
            </Link>
            <Link href="/kontakt" className="btn-secondary">
              Kontakt aufnehmen
            </Link>
          </motion.div>

          <motion.div
            {...reveal(0.22)}
            className="mx-auto mt-10 flex max-w-lg flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-leinen pt-7 lg:mx-0 lg:justify-start"
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

        {/* Fensterspalte */}
        <motion.div {...reveal(0.26)}>
          <WindowStack />
        </motion.div>
      </div>
    </section>
  )
}
