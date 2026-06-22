'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

function PulseIllustration() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute rounded-full border border-gruen"
        style={{ width: '100%', height: '100%' }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.06, 0.12] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      {/* Middle ring */}
      <div
        className="absolute rounded-full border border-gruen/25"
        style={{ width: '75%', height: '75%' }}
        aria-hidden="true"
      />
      {/* Inner ring */}
      <div
        className="absolute rounded-full border border-gruen/40"
        style={{ width: '50%', height: '50%' }}
        aria-hidden="true"
      />
      {/* Center */}
      <div className="w-16 h-16 rounded-full bg-salbei border-2 border-gruen flex items-center justify-center z-10">
        <div className="w-5 h-5 rounded-full bg-gruen" />
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="hero"
      className="bg-sand min-h-screen flex items-center pt-16"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-16 items-center w-full"
      >
        {/* Text */}
        <div>
          <motion.p
            variants={fadeInUp}
            className="text-gruen text-xs font-semibold uppercase tracking-widest mb-5"
          >
            Web & Software · Schweiz
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-jakarta font-bold text-[clamp(36px,5vw,56px)] leading-[1.05] tracking-tight text-wald mb-6"
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
            <a href="#leistungen" className="btn-primary">
              Leistungen entdecken
            </a>
            <a href="#kontakt" className="btn-secondary">
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>

        {/* Illustration */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center"
        >
          <PulseIllustration />
        </motion.div>
      </motion.div>
    </section>
  )
}
