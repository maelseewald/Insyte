'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

function PulseIllustration() {
  const rings = [
    { size: '100%', opacity: 0.12, delay: 0 },
    { size: '75%', opacity: 0.25, delay: 0.6 },
    { size: '50%', opacity: 0.4, delay: 1.2 },
  ]

  return (
    <motion.div
      className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96"
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      {/* Radar-style emitting ring */}
      <motion.div
        className="absolute rounded-full border border-gruen"
        style={{ width: '50%', height: '50%' }}
        animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Breathing concentric rings */}
      {rings.map((ring) => (
        <motion.div
          key={ring.size}
          className="absolute rounded-full border border-gruen"
          style={{ width: ring.size, height: ring.size, opacity: ring.opacity }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: ring.delay,
          }}
        />
      ))}

      {/* Center — breathing */}
      <motion.div
        className="w-16 h-16 rounded-full bg-salbei border-2 border-gruen flex items-center justify-center z-10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-5 h-5 rounded-full bg-gruen" />
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="hero"
      className="relative bg-sand min-h-screen flex items-center pt-16"
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

      {/* Scroll-down indicator */}
      <motion.a
        href="#leistungen"
        aria-label="Nach unten scrollen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-erde/50 hover:text-gruen transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-widest font-semibold">
          Scroll
        </span>
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </motion.a>
    </section>
  )
}
