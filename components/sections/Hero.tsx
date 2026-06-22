'use client'

import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

const axisLine: Variants = {
  hidden: { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 0.9, ease: 'easeOut' } },
}

const markerPop: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.35 },
  },
}

const CREDENTIALS = [
  { label: 'Projekte', value: '10+' },
  { label: 'Reichweite', value: 'Schweizweit' },
  { label: 'Ansprechpartner', value: '1' },
]

function AmbientLens() {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 md:block lg:-right-20"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1, rotate: 360 }}
      transition={{
        opacity: { duration: 1.2, ease: 'easeOut' },
        scale: { duration: 1.2, ease: 'easeOut' },
        rotate: { duration: 90, repeat: Infinity, ease: 'linear' },
      }}
    >
      <div className="relative h-[560px] w-[560px]">
        {[560, 440, 320, 200].map((size, i) => (
          <span
            key={size}
            className="absolute rounded-full border border-gruen"
            style={{
              width: size,
              height: size,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.06 + i * 0.04,
            }}
          />
        ))}
        {/* focal point */}
        <span className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gruen/30 bg-salbei/40" />
        <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gruen/80" />
      </div>
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-sand flex flex-col justify-center px-6 pt-28 pb-16"
    >
      <AmbientLens />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 mx-auto w-full max-w-5xl"
      >
        {/* Headline on the focus axis */}
        <div className="relative pl-10 md:pl-16">
          {/* axis line */}
          <motion.span
            variants={axisLine}
            style={{ originY: 0 }}
            className="absolute left-2 top-2 h-[calc(100%-0.5rem)] w-px bg-leinen"
            aria-hidden="true"
          />
          {/* lens marker at the top of the axis */}
          <motion.span
            variants={markerPop}
            className="absolute left-0 top-[6px] flex h-4 w-4 items-center justify-center rounded-full border border-gruen bg-sand"
            aria-hidden="true"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-gruen" />
          </motion.span>

          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-[0.22em] mb-7"
          >
            Web &amp; Software · Schweiz
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className="font-jakarta font-bold text-[clamp(38px,7vw,68px)] leading-[1.02] tracking-[-0.03em] text-wald mb-8 max-w-3xl"
          >
            Wir bringen lokale Unternehmen ins digitale Zeitalter.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-erde text-lg leading-relaxed mb-10 max-w-xl"
          >
            Massgeschneiderte Websites und Softwarelösungen für KMUs –
            entwickelt mit Sorgfalt, erklärt in einfacher Sprache.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
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
          variants={fadeInUp}
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
          <a
            href="#anwendungsfaelle"
            aria-label="Nach unten scrollen"
            className="group ml-auto hidden items-center gap-2 self-center text-erde/50 transition-colors hover:text-gruen sm:flex"
          >
            <span className="text-[11px] uppercase tracking-[0.18em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              ↓
            </motion.span>
          </a>
        </motion.dl>
      </motion.div>
    </section>
  )
}
