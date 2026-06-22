'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

// Independent, self-completing reveal — no fragile variant propagation.
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

const CREDENTIALS = [
  { label: 'Projekte', value: '10+' },
  { label: 'Reichweite', value: 'Schweizweit' },
  { label: 'Ansprechpartner', value: '1' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-sand flex flex-col justify-center px-6 pt-28 pb-16"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Headline on the focus axis */}
        <div className="relative pl-10 md:pl-16">
          {/* axis line */}
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute left-2 top-2 h-[calc(100%-0.5rem)] w-px bg-leinen"
            aria-hidden="true"
          />
          {/* lens marker at the top of the axis */}
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            className="absolute left-0 top-[6px] flex h-4 w-4 items-center justify-center rounded-full border border-gruen bg-sand"
            aria-hidden="true"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-gruen" />
          </motion.span>

          <motion.p
            {...reveal(0.05)}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.22em] mb-7"
          >
            Web &amp; Software · Schweiz
          </motion.p>

          <motion.h1
            {...reveal(0.12)}
            className="font-jakarta font-bold text-[clamp(38px,7vw,68px)] leading-[1.02] tracking-[-0.03em] text-wald mb-8 max-w-3xl"
          >
            Wir bringen lokale Unternehmen ins digitale Zeitalter.
          </motion.h1>

          <motion.p
            {...reveal(0.22)}
            className="text-erde text-lg leading-relaxed mb-10 max-w-xl"
          >
            Massgeschneiderte Websites und Softwarelösungen für KMUs –
            entwickelt mit Sorgfalt, erklärt in einfacher Sprache.
          </motion.p>

          <motion.div {...reveal(0.32)} className="flex flex-wrap gap-3">
            <Link href="/leistungen" className="btn-primary">
              Leistungen entdecken
            </Link>
            <a href="#kontakt" className="btn-secondary">
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>

        {/* Credential index strip */}
        <motion.dl
          {...reveal(0.42)}
          className="mt-20 flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-leinen pt-7"
        >
          {CREDENTIALS.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] uppercase tracking-[0.18em] text-erde/50 mb-1">
                {item.label}
              </dt>
              <dd className="font-jakarta font-bold text-wald text-lg leading-none">
                {item.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
